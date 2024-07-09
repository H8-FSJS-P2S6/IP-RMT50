'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let clipJson = require(`../db/Clippertrack.json`)
    let clips = clipJson
    .filter(e => e !== null && e !== undefined && e.channelName !== null && e.channelName !== undefined && e.channelId !== null && e.channelId !== undefined)
    .map(e => ({
      ...e,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('ChannelViews', clips);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
