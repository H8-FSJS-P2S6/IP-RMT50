'use strict';

const { hashPassword } = require('../helpers/bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let userJson = require(`../db/user.json`)
    let users = userJson.map(e => {
      e.password = hashPassword(e.password)
      e.createdAt = new Date()
      e.updatedAt = new Date()
      return e
    })
    return queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
