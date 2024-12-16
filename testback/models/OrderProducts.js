module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
      quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
  }, {});

  OrderProduct.associate = (models) => {
      OrderProduct.belongsTo(models.Order, {
          foreignKey: 'OrderId',
          onDelete: 'CASCADE',
      });

      OrderProduct.belongsTo(models.Product, {
          foreignKey: 'productId',
          onDelete: 'CASCADE',
      });
  };

  return OrderProduct;
};
