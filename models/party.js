'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Party extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Party.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    CharacterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `CharacterId is required`
        },
        notEmpty: {
          args: true,
          msg: `CharacterId is required`
        }
      }
    },
    WeaponId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `WeaponId is required`
        },
        notEmpty: {
          args: true,
          msg: `WeaponId is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Party',
  });
  return Party;
};