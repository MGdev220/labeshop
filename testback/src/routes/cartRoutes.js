// routes/cart.js
const express = require('express');
const cartController = require('../controllers/cartController'); // Import du contrôleur Cart
const router = express.Router();

// Créer un panier pour un utilisateur
router.post('/', cartController.createCart);

// Ajouter un produit au panier
router.post('/add', cartController.addProductToCart);

// Supprimer un produit du panier
router.post('/remove', cartController.removeProductFromCart);

// Récupérer tous les produits du panier d'un utilisateur
router.get('/:userId', cartController.getCart);

// Vider le panier
router.post('/clear', cartController.clearCart);

// Route pour mettre à jour la quantité d'un produit dans un panier
router.put("/:cartId/products/:productId", cartController.updateCartQuantity);

module.exports = router;
