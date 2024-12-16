// routes/order.js
const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

// Créer une commande
router.post('/', orderController.createOrder);

// Récupérer toutes les commandes
router.get('/', orderController.getAllOrders);

// Récupérer une commande par ID
router.get('/:id', orderController.getOrderById);

// Mettre à jour une commande
router.put('/:id', orderController.updateOrder);

// Supprimer une commande
router.delete('/:id', orderController.deleteOrder);

// Route pour récupérer les commandes d'un utilisateur
router.get('/user/:userId/orders', orderController.getUserOrders);

// Route pour mettre à jour le statut d'une commande
router.post('/orders/:orderId/status', orderController.updateOrderStatus);

module.exports = router;
