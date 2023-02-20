const features = require('../resources/features');


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Features', features, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Features', null, {});
  }
};