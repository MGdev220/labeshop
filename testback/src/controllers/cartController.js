// controllers/cartController.js
const {Cart} = require('../../models');
const {Product, CartProducts} = require('../../models');
const sequelize = require('../../config/database');

// Créer un panier (si le panier n'existe pas déjà pour un utilisateur)
const createCart = async (userId) => {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      // Créer un nouveau panier si celui de l'utilisateur n'existe pas
      cart = await Cart.create({ userId, total: 0 });
    }
};


const updateCartQuantity = async (req, res) => {
  const { cartId, productId } = req.params; // Récupération des paramètres
  const { quantity } = req.body; // Quantité envoyée dans le corps de la requête

  try {
    // Vérifie que la quantité est valide
    if (quantity < 0) {
      return res.status(400).json({ message: "La quantité doit être positive." });
    }

    // Vérifie si le panier existe
    const cart = await Cart.findByPk(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Panier non trouvé." });
    }

    // Vérifie si le produit existe
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    // Vérifie si le produit est déjà dans le panier
    const cartProduct = await CartProducts.findOne({
      where: { cartId, productId },
    });

    if (cartProduct) {
      if (quantity === 0) {
        // Supprime l'entrée si la quantité est 0
        await cartProduct.destroy();
        return res.status(200).json({ message: "Produit retiré du panier." });
      } else {
        // Met à jour la quantité
        cartProduct.quantity = quantity;
        await cartProduct.save();
        return res.status(200).json({ message: "Quantité mise à jour.", cartProduct });
      }
    } else {
      // Ajoute le produit au panier si non présent
      if (quantity > 0) {
        const newCartProduct = await CartProducts.create({
          cartId,
          productId,
          quantity,
        });
        return res.status(201).json({ message: "Produit ajouté au panier.", newCartProduct });
      } else {
        return res.status(400).json({ message: "La quantité doit être supérieure à 0." });
      }
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du panier :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// Ajouter un produit au panier
const addProductToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    await createCart(userId);
    // Récupérer le panier de l'utilisateur
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Récupérer le produit
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Ajouter ou mettre à jour le produit dans le panier
    await cart.addProduct(product, { through: { quantity } });

    // Mettre à jour le total du panier
    const cartTotal = await cart.getProducts({
      attributes: [[sequelize.fn('sum', sequelize.col('price')), 'total']],
    });

    cart.total = cartTotal[0].total;
    await cart.save();

    res.json({
      message: 'Product added to cart',
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Supprimer un produit du panier
const removeProductFromCart = async (req, res) => {
  try {
    const { productId  , userId  } = req.body;
    console.log('userId :', userId, 'productId :', productId);
    
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Supprimer le produit du panier
    await cart.removeProduct(product);

    // Mettre à jour le total du panier
    const cartTotal = await cart.getProducts({
      attributes: [[sequelize.fn('sum', sequelize.col('price')), 'total']],
    });

    cart.total = cartTotal[0].total;
    await cart.save();

    res.json({
      message: 'Product removed from cart',
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Récupérer tous les produits dans le panier
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: Product,
        through: { attributes: ['quantity'] },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Vider le panier
const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    await cart.setProducts([]);
    cart.total = 0;
    await cart.save();

    res.json({
      message: 'Cart cleared successfully',
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCart,
  addProductToCart,
  removeProductFromCart,
  getCart,
  clearCart,
  updateCartQuantity
};
