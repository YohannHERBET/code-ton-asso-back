const { faker } = require('@faker-js/faker/locale/fr');

const categories = require('../resources/categories');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', categories, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};