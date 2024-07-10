'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChannelViews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChannelViews.belongsTo(models.Channel, { foreignKey: "channelId", targetKey: "channelId" })
    }
  }
  ChannelViews.init({
    channelName: DataTypes.STRING,
    channelId: {
      type: DataTypes.STRING,
      references: {
        model: 'Channels',
        key: 'channelId'
      }
    },
    tag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChannelViews',
  });
  return ChannelViews;
};