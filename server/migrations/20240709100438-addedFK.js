'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('ChannelViews', {
      fields: ['channelId'],
      type: 'foreign key',
      name: 'fk_channelviews_channels',
      references: {
        table: 'Channels',
        field: 'channelId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('ChannelViews', 'fk_channelviews_channels');
  }
};