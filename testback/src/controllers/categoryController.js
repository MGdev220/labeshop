
// controllers/categoryController.js
const { Product } = require('../../models');
const { Category } = require('../../models');


// Créer une catégorie
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });
    res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Récupérer les produits d'une catégorie
const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params; // ID de la catégorie

    // Vérifie si la catégorie existe
    const category = await Category.findByPk(id, {
      include: {
        model: Product,
        as: 'Products',
      },
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({
      category: category.name,
      products: category.Products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Récupérer toutes les catégories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Contrôleur pour récupérer toutes les catégories avec leurs produits
const getAllCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'name', 'description', 'code', 'price', 'image'], // Sélectionner les champs nécessaires
        },
      ],
    });

    // Vérifiez si des catégories existent
    if (categories.length === 0) {
      return res.status(404).json({ message: 'Aucune catégorie trouvée.' });
    }

    // Répondre avec la liste des catégories et leurs produits
    res.status(200).json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories avec produits :', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Récupérer une catégorie par ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mettre à jour une catégorie
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name;
    await category.save();

    res.json({
      message: 'Category updated successfully',
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Supprimer une catégorie
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
  getAllCategoriesWithProducts
};
