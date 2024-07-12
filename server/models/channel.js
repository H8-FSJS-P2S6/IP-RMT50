'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Channel.hasOne(models.ChannelViews, { foreignKey: "channelId", sourceKey: "channelId" })
    }
  }
  Channel.init({
    channelId: {
      type: DataTypes.STRING,
      unique: true, 
      allowNull: false
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    customUrl: DataTypes.STRING,
    publishedAt: DataTypes.DATE,
    thumbnails: DataTypes.STRING,
    country: DataTypes.STRING,
    viewCount: DataTypes.INTEGER,
    subscriberCount: DataTypes.INTEGER,
    videoCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Channel',
    indexes: [
      {
        unique: true,
        fields: ['channelId']
      }
    ]
  });
  return Channel;
};