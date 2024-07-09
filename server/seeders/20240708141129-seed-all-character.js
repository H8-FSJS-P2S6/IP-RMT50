'use strict';
const characterData = require('../Database/Characters.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query('SELECT id FROM "Users"', {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });

    const userIds = users.map(user => user.id);

    const validCharacters = characterData.filter(character => userIds.includes(character.userId));

    const characters = validCharacters.map(character => ({
      ...character,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Characters', characters, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Characters', null, {});
  }
};
