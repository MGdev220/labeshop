// controllers/orderController.js
const { Order } = require('../../models');
const { Product } = require('../../models');
const { OrderProduct, User } = require('../../models');
const sequelize = require('../../config/database');
const { generateOrderNumber } = require('../utils/utils')

// Créer une commande
const createOrder = async (req, res) => {
  try {
    const { products, total, status, userId } = req.body;
    console.log(products);

    // Créer la commande principale
    const order = await Order.create({
      total,
      status,
      userId,
      orderNumber: "ORD"+generateOrderNumber(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Ajouter les relations pour chaque produit
    const orderProducts = products.map(product => ({
      OrderId: order.id,
      productId: product.id, // Vérifiez que vous utilisez bien productId ici
      quantity: product.CartProducts.quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await OrderProduct.bulkCreate(orderProducts);

    return res.status(201).json({ message: 'Commande ajoutée avec succès.', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Récupérer toutes les commandes
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: Product,
        through: { attributes: ['quantity'] },
      },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Récupérer une commande par ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: {
        model: Product,
        through: { attributes: ['quantity'] },
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params; // L'ID de la commande passé dans l'URL
  const { status } = req.body; // Le nouveau statut à appliquer
console.log(status);

  try {
    // Vérifie que le statut est valide
    const validStatuses = ['en attente', 'soumis', 'validé', 'annulé'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Statut invalide.' });
    }

    // Recherche la commande par son ID
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Commande introuvable.' });
    }

    // Met à jour le statut de la commande
    order.status = status;
    await order.save();

    return res.status(200).json({
      message: 'Statut de la commande mis à jour avec succès.',
      order,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut :', error);
    return res.status(500).json({
      message: 'Une erreur est survenue lors de la mise à jour du statut.',
      error: error.message,
    });
  }
};



// Mettre à jour une commande
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, total } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Mise à jour des champs
    if (status) order.status = status;
    if (total) order.total = total;

    await order.save();
    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getUserOrders = async (req, res) => {
  const userId = req.params.userId;
  try {
    // Utilisation d'une requête brute pour récupérer les commandes et leurs produits
    const orders = await sequelize.query(
      `
      SELECT 
        o.id AS orderId, 
        o.orderNumber, 
        o.orderDate, 
        o.status, 
        o.total, 
        p.id AS productId, 
        p.name AS productName, 
        p.price AS productPrice, 
        p.description AS productDescription, 
        op.quantity AS productQuantity
      FROM Orders o
      JOIN OrderProducts op ON o.id = op.OrderId
      JOIN Products p ON p.id = op.productId
      WHERE o.userId = :userId
      ORDER BY o.orderDate DESC
      `,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: "Aucune commande trouvée pour cet utilisateur." });
    }

    // Réorganiser les données pour regrouper les produits par commande
    const groupedOrders = orders.reduce((result, item) => {
      const orderIndex = result.findIndex(order => order.orderId === item.orderId);
      const product = {
        id: item.productId,
        name: item.productName,
        price: item.productPrice,
        quantity: item.productQuantity,
      };

      if (orderIndex === -1) {
        // Créer une nouvelle commande
        result.push({
          orderId: item.orderId,
          orderNumber: item.orderNumber,
          orderDate: item.orderDate,
          status: item.status,
          total: item.total,
          products: [product],
        });
      } else {
        // Ajouter le produit à la commande existante
        result[orderIndex].products.push(product);
      }

      return result;
    }, []);

    res.json(groupedOrders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    res.status(500).json({ message: "Une erreur s'est produite." });
  }
};


// Supprimer une commande
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // Désactiver les contraintes de clé étrangère
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    // Supprimer la commande de la table Orders (sans vérifier les clés étrangères)
    await sequelize.query('DELETE FROM Orders WHERE id = :id', {
      replacements: { id },
      type: sequelize.QueryTypes.DELETE,
    });

    // Supprimer les produits associés (même chose)
    await sequelize.query('DELETE FROM OrderProducts WHERE id = :id', {
      replacements: { id },
      type: sequelize.QueryTypes.DELETE,
    });

    // Réactiver les contraintes de clé étrangère
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    res.status(200).json({ message: "Commande et ses produits associés supprimés avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la commande :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};


module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  getUserOrders
};
