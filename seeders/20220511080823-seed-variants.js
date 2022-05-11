'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('variants', [
      {
        productId: 1,
        color: 'Putih',
        size: 'S',
        isi: 'setelan',
        stock: 20,
        price: 99000,
      },
      {
        productId: 1,
        color: 'Putih',
        size: 'S',
        isi: 'atasan',
        stock: 20,
        price: 65000,
      },
      {
        productId: 1,
        color: 'Abu',
        size: 'L',
        isi: 'setelan',
        stock: 0,
        price: 99000,
      },
      {
        productId: 1,
        color: 'Oren',
        size: 'M',
        isi: 'atasan',
        stock: 10,
        price: 65000,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('variants', null, {});
  },
};
