'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Order, { foreignKey: 'userId' });
      this.hasOne(models.Cart, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING
    },
    { sequelize, modelName: 'User' }
  );
  return User;
};
