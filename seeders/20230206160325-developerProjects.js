const { faker } = require('@faker-js/faker/locale/fr');

const nbOfProjects = 10;
const nbOfDevelopers = 50;
const maxNbOfDevInProject = 4;
const developerProjects = [];

const getRandomUniqueDevId = (randomIdArray) => {
  const randomId = faker.datatype.number({ min: 1, max: nbOfDevelopers });
  if (randomIdArray.includes(randomId)) {
    return getRandomUniqueDevId(randomIdArray);
  }
  randomIdArray.push(randomId);
  return randomId;
};

for (let projectId = 1; projectId <= nbOfProjects; projectId++) {
  randomIdArray = [];
  const devsInThisProject = faker.datatype.number({ min: 0, max: maxNbOfDevInProject });
  if (devsInThisProject === 0) {
    continue;
  }
  for (let nbOfDevInProject = 1; nbOfDevInProject <= devsInThisProject; nbOfDevInProject++) {
    developerProjects.push({
      ProjectId: projectId,
      DeveloperId: getRandomUniqueDevId(randomIdArray),
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