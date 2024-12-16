'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
      this.belongsToMany(models.Order, { through: 'OrderProducts', foreignKey: 'productId' });
      this.belongsToMany(models.Cart, { through: 'CartProducts', foreignKey: 'productId' });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      code: DataTypes.STRING,
      price: DataTypes.FLOAT,
      image: DataTypes.STRING,
    },
    { sequelize, modelName: 'Product' }
  );
  return Product;
};
