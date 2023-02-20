const categories = require('../resources/categories.js');
const getRandomNumber = require('../utils/randomNumberGenerator.js');
const getRandomUniqueId = require('../utils/uniqueRandomIdGenerator');

const associationCategories = [];

for (let assoId = 1; assoId <= 50; assoId++) {
  let categIdArray = [];
  for (let categNumber = 1; categNumber <= getRandomNumber(1, 2); categNumber++){
    associationCategories.push({
      associationId: assoId,
      categoryId: getRandomUniqueId(categIdArray, categories.length),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AssociationCategories', associationCategories, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AssociationCategories', null, {});
  }
};