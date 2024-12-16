'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      total: { type: Sequelize.FLOAT, allowNull: false },
      status: { type: Sequelize.STRING, defaultValue: 'en attente' },
      userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
