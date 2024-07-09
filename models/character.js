'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Character.init({
    name: DataTypes.STRING,
    rarity: DataTypes.STRING,
    weapon: DataTypes.STRING,
    vision: DataTypes.STRING,
    wiki_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};