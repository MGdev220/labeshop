// migrations/XXXXXX-remove-carrier-from-order.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'carrier');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'carrier', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
