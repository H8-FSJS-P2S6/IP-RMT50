'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ChannelViews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      channelName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      channelId: {
        type: Sequelize.STRING,
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

    // Add columns for tracking dates
    const startDate = new Date('2022-03-01');
    const endDate = new Date('2024-07-01');
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      console.log(currentDate)
      const columnName1 = currentDate.toISOString().slice(0, 10)
      await queryInterface.addColumn('ChannelViews', columnName1, {
        type: Sequelize.INTEGER,
        allowNull: true
      });

       if (currentDate.getDate() === 1) {
        currentDate.setDate(16);
      } else {
        currentDate.setDate(1);
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ChannelViews');
  }
};