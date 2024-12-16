module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Pour garantir que chaque numéro de commande est unique
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Date actuelle par défaut
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transporter: {
      type: DataTypes.STRING, // Vous pouvez ajuster le type selon vos besoins
      allowNull: true, // Le champ peut être nullable, ajustez selon votre logique
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending', // Statut par défaut
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {});

  Order.associate = function(models) {
    // Association avec les produits (relation many-to-many via OrderProducts)
    Order.belongsToMany(models.Product, { through: 'OrderProducts' });
  };

  return Order;
};
