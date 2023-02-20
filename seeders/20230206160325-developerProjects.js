const getRandomUniqueId = require('../utils/uniqueRandomIdGenerator');
const getRandomNumber = require('../utils/randomNumberGenerator.js');

const nbOfProjects = 10;
const nbOfDevelopers = 50;
const maxNbOfDevInProject = 4;
const developerProjects = [];

for (let projectId = 1; projectId <= nbOfProjects; projectId++) {
  randomIdArray = [];
  const devsInThisProject = getRandomNumber(0, maxNbOfDevInProject);
  if (devsInThisProject === 0) {
    continue;
  }
  for (let nbOfDevInProject = 1; nbOfDevInProject <= devsInThisProject; nbOfDevInProject++) {
    developerProjects.push({
      ProjectId: projectId,
      DeveloperId: getRandomUniqueId(randomIdArray, nbOfDevelopers),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DeveloperProjects', developerProjects, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DeveloperProjects', null, {});
  }
};