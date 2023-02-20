const skills = require('../resources/skills.js');
const getRandomUniqueId = require('../utils/uniqueRandomIdGenerator');

const developersSkills = [];

for (let index = 1; index <= 50; index++) {
  randomIndexArray = [];
  for (let index2 = 1; index2 <= 3; index2++) {
    developersSkills.push({
      DeveloperId: index,
      SkillId: getRandomUniqueId(randomIndexArray, skills.length),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DeveloperSkills', developersSkills, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DeveloperSkills', null, {});
  }
};