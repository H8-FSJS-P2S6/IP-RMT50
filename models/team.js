'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.hasMany(models.Character)
      Team.belongsTo(models.Party, { foreignKey: `PartyId` })
    }
  }
  Team.init({
    PartyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Party Id cannot be empty`
        },
        notNull: {
          args: true,
          msg: `Party Id is required`
        }
      }
    },
    CharacterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Character Id cannot be empty`
        },
        notNull: {
          args: true,
          msg: `Character Id is required`
        }
      }
    },
    WeaponId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Weapon Id cannot be empty`
        },
        notNull: {
          args: true,
          msg: `Weapon Id is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};