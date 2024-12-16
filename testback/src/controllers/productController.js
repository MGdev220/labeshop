// controllers/productController.js
const {Product} = require('../../models'); // Modèle Product
const {Category} = require('../../models'); // Modèle Category pour la relation

// Créer un produit
const createProduct = async (req, res) => {
  try {
    const { name, description, code, price, image, categoryId } = req.body;

    // Création du produit
    const product = await Product.create({
      name,
      description,
      code,
      price,
      image,
      categoryId, // Association avec la catégorie
    });

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Récupérer tous les produits
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        // as: 'category', // Inclure la catégorie associée
        attributes: ['name'],
      }],
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Récupérer un produit par ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{
        model: Category,
        as: 'category', // Inclure la catégorie associée
        attributes: ['name'],
      }],
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Récupérer les produits par catégorie
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Vérifier si la catégorie existe
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Récupérer les produits de cette catégorie
    const products = await Product.findAll({
      where: { categoryId },
    });

    res.json({
      category: category.name,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Mettre à jour un produit
const updateProduct = async (req, res) => {
  try {
    const { name, description, code, price, image, categoryId } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.code = code || product.code;
    product.price = price || product.price;
    product.image = image || product.image;
    product.categoryId = categoryId || product.categoryId;

    await product.save();

    res.json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Supprimer un produit
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};
