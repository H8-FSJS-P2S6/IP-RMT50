'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PartyId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Parties`,
          key: `id`
        }
      },
      CharacterId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Characters`,
          key: `id`
        }
      },
      WeaponId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Weapons`,
          key: `id`
        }
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
    await queryInterface.dropTable('Teams');
  }
};