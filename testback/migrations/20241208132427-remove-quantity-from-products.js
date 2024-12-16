'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Supprime la colonne `quantity` de la table `Products`
    await queryInterface.removeColumn('Products', 'quantity');
  },

  async down(queryInterface, Sequelize) {
    // Ajoute la colonne `quantity` dans la table `Products` pour un rollback
    await queryInterface.addColumn('Products', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
  },
};
