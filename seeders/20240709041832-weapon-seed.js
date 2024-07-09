'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../data/weapon.json').map((e) => {
      delete e.id;
      e.createdAt = e.updatedAt = new Date();
      return e
    });
    await queryInterface.bulkInsert('Weapons', data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Weapons', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
