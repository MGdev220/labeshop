'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartProducts extends Model {
    static associate(models) {
      this.belongsTo(models.Cart, { foreignKey: 'cartId' });
      this.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  CartProducts.init(
    {
      quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    { sequelize, modelName: 'CartProducts' }
  );
  return CartProducts;
};
