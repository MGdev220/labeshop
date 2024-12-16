// routes/productRoutes.js
const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory
} = require('../controllers/productController'); // Importation des méthodes du contrôleur

const router = express.Router();

// Créer un produit
router.post('/', createProduct);

// Récupérer tous les produits
router.get('/', getAllProducts);

// Récupérer un produit par ID
router.get('/:id', getProductById);

// Mettre à jour un produit
router.put('/:id', updateProduct);

// Supprimer un produit
router.delete('/:id', deleteProduct);

// Récupérer les produits par catégorie
router.get('/category/:categoryId', getProductsByCategory);

module.exports = router;
