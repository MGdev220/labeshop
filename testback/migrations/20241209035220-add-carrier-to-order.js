// migrations/XXXXXXXXXXXXXX-add-transporter-to-order.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'transporter', {
      type: Sequelize.STRING,
      allowNull: true,  // Le champ peut être nul si nécessaire
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'transporter');
  },
};
