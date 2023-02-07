const { faker } = require('@faker-js/faker/locale/fr');
const types = require('../resources/types');


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Types', types, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Types', null, {});
  }
};