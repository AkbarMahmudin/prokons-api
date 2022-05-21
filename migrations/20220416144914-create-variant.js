'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('variants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id',
                },
            },
            color: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            size: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isi: {
                type: Sequelize.ENUM('atasan', 'setelan', 'bawahan'),
                allowNull: false,
            },
            stock: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
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
        await queryInterface.dropTable('variants');
    },
};
