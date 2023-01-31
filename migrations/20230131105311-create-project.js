'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      other_features: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.DATE
      },
      slug: {
        type: Sequelize.STRING
      },
      visible: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.ENUM('NotStarted', 'InProgress', 'Finished')
      },
      type_id: {
        type: Sequelize.INTEGER
      },
      association_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Projects');
  }
};