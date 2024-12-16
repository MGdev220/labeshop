'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsToMany(models.Product, { through: 'CartProducts', foreignKey: 'cartId' });
    }
  }
  Cart.init(
    {
      total: DataTypes.FLOAT,
    },
    { sequelize, modelName: 'Cart' }
  );
  return Cart;
};
