'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      transactionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'transactions',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      },
      variantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'variants',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  },
};
