// routes/category.js
const express = require('express');
const categoryController = require('../controllers/categoryController'); // Import du contrôleur Category
const router = express.Router();

// Créer une catégorie
router.post('/', categoryController.createCategory);

// Route pour récupérer les produits d'une catégorie
router.get('/:id/products', categoryController.getProductsByCategory);

// Récupérer toutes les catégories
router.get('/', categoryController.getAllCategories);

// Récupérer une catégorie par ID
router.get('/:id', categoryController.getCategoryById);

// Mettre à jour une catégorie
router.put('/:id', categoryController.updateCategory);

// Supprimer une catégorie
router.delete('/:id', categoryController.deleteCategory);

// Route pour récupérer toutes les catégories et leurs produits
router.get('/categories-with-products', categoryController.getAllCategoriesWithProducts);

module.exports = router;
