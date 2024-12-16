'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Valeur par défaut pour les produits existants
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'quantity');
  },
};



// 'use strict';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Products', {
//       id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
//       name: { type: Sequelize.STRING, allowNull: false },
//       description: { type: Sequelize.STRING },
//       code: { type: Sequelize.STRING },
//       price: { type: Sequelize.FLOAT, allowNull: false },
//       quantity: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         defaultValue: 0, // Valeur par défaut
//       },
//       image: { type: Sequelize.STRING },
//       categoryId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Categories', key: 'id' } },
//       createdAt: { allowNull: false, type: Sequelize.DATE },
//       updatedAt: { allowNull: false, type: Sequelize.DATE },
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('Products');
//   },
// };
