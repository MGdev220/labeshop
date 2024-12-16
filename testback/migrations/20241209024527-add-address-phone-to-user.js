// migrations/xxxxxx-add-address-phone-to-user.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING,
      allowNull: true,  // Permet à l'adresse d'être facultative
    });

    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,  // Permet au téléphone d'être facultatif
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'address');
    await queryInterface.removeColumn('Users', 'phone');
  },
};
