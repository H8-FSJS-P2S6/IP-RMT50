'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Party, { foreignKey: `` })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name is required`
        },
        notNull: {
          args: true,
          msg: `Name is required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Email cannot be empty`
        },
        notNull: {
          args: true,
          msg: `Email is required`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: `Staff`
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password is required`
        },
        notNull: {
          args: true,
          msg: `Password is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};