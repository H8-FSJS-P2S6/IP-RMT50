'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const axios = require('axios');

    const options = {
      method: `GET`,
      url: `https://gsi.fly.dev/characters/?page=1&limit=51`
    };
    try {
      const response = await axios.request(options)
      response.data.results.map((e) => {
        e.createdAt = e.updatedAt = new Date();
        return e
      })
      await queryInterface.bulkInsert('Characters', response.data.results);
    } catch (err) {
      console.error(err);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Characters", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
