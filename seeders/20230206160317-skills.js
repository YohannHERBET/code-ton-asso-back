const { faker } = require('@faker-js/faker/locale/fr');
const skills = require('../resources/skills.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Skills', skills, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Skills', null, {});
  }
};