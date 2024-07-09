'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Channels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      channelId: {
        type: Sequelize.STRING,
        unique :true
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      customUrl: {
        type: Sequelize.STRING
      },
      publishedAt: {
        type: Sequelize.DATE
      },
      thumbnails: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      viewCount: {
        type: Sequelize.INTEGER
      },
      subscriberCount: {
        type: Sequelize.INTEGER
      },
      videoCount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Channels');
  }
};