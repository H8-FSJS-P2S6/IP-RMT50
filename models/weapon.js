'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weapon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Weapon.init({
    name: DataTypes.STRING,
    rarity: DataTypes.INTEGER,
    TypeId: DataTypes.INTEGER,
    baseAttack: DataTypes.INTEGER,
    effect: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Weapon',
  });
  return Weapon;
};