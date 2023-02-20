const features = require('../resources/features');
const getRandomUniqueId = require('../utils/uniqueRandomIdGenerator');

const maxNbOfFeatInProject = 4;
const nbOfProjects = 10;

const projectFeatures = [];

for (let projectId = 1; projectId <= nbOfProjects; projectId++) {
  randomIndexArray = [];
  for (let nbOfFeatInProject = 1; nbOfFeatInProject <= maxNbOfFeatInProject; nbOfFeatInProject++) {
    projectFeatures.push({
      projectId: projectId,
      featureId: getRandomUniqueId(randomIndexArray, features.length),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProjectFeatures', projectFeatures, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProjectFeatures', null, {});
  }
};