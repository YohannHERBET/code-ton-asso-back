const { faker } = require('@faker-js/faker/locale/fr');
const features = require('../resources/features');

const maxNbOfFeatInProject = 4;
const nbOfProjects = 10;

const projectFeatures = [];

const getRandomUniqueFeatureId = (randomIndexArray) => {
  const randomIndex = faker.datatype.number({ min: 1, max: features.length });
  if (randomIndexArray.includes(randomIndex)) {
    return getRandomUniqueFeatureId(randomIndexArray);
  }
  randomIndexArray.push(randomIndex);
  return randomIndex;
};

for (let projectId = 1; projectId <= nbOfProjects; projectId++) {
  randomIndexArray = [];
  for (let nbOfFeatInProject = 1; nbOfFeatInProject <= maxNbOfFeatInProject; nbOfFeatInProject++) {
    projectFeatures.push({
      projectId: projectId,
      featureId: getRandomUniqueFeatureId(randomIndexArray),
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