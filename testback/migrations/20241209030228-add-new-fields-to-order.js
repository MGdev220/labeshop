module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'orderNumber', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.addColumn('Orders', 'orderDate', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.addColumn('Orders', 'deliveryDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Orders', 'deliveryAddress', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Orders', 'carrier', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'orderNumber');
    await queryInterface.removeColumn('Orders', 'orderDate');
    await queryInterface.removeColumn('Orders', 'deliveryDate');
    await queryInterface.removeColumn('Orders', 'deliveryAddress');
    await queryInterface.removeColumn('Orders', 'carrier');
  }
};
