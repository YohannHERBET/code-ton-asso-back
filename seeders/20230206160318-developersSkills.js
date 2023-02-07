const { faker } = require('@faker-js/faker/locale/fr');
const skills = require('../resources/skills.js');

const developersSkills = [];

//! Méthode permettant de générer un nombre aléatoire UNIQUE entre 1 et 27
// On envoie en paramètre un tableau qui contient les nombres déjà générés (randomIndexArray).
// Au premier appel, le tableau est vide.
const getRandomUniqueSkill = (randomIndexArray) => {
  // On génère un nombre aléatoire entre 1 et 27 via Faker, mais on aurait pu utiliser Math.floor(Math.random() * 27);
  const randomIndex = faker.datatype.number({ min: 1, max: skills.length });
  // Si ce nombre est déjà présent dans le tableau, on rappelle la fonction, et on recommence jusqu'à ce que le nombre généré soit unique.
  if (randomIndexArray.includes(randomIndex)) {
    // On rappelle la fonction car le nombre n'es pas unique, il est déjà présent dans le tableau.
    return getRandomUniqueSkill(randomIndexArray);
  }
  // Le nombre généré est unique, on l'ajoute au tableau pour ne plus retomber dessus
  randomIndexArray.push(randomIndex);
  // On retourne le nombre généré.
  return randomIndex;
};

for (let index = 1; index <= 50; index++) {
  randomIndexArray = [];
  for (let index2 = 1; index2 <= 3; index2++) {
    developersSkills.push({
      DeveloperId: index,
      SkillId: getRandomUniqueSkill(randomIndexArray),
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