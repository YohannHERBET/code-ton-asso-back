'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Developers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('Frontend', 'Backend', 'Fullstack')
      },
      work_preferences: {
        type: Sequelize.ENUM('Solo', 'Group', 'Both')
      },
      level: {
        type: Sequelize.ENUM('Junior', 'Intermediate', 'Senior')
      },
      slug: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Developers');
  }
};