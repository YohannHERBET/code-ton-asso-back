const { faker } = require('@faker-js/faker/locale/fr');
const categories = require('../resources/categories.js');

// Une association peut avoir une seule catégorie.
// Une association peut avoir plusieurs catégories.
// On a 50 associations.
// On a 29 catégories.

// 1. Créer une fonction qui va renvoyer soit 1 soit 2
function getRandomNumber() {
  return Math.floor(Math.random() * (3 - 1) + 1);
}

// 4.
function createUniqueRandomCatId(array) {
  let category_id = Math.floor(Math.random() * (categories.length - 1) + 1);
  if (array.includes(category_id)) {
    return createUniqueRandomCatId(array);
  }
  array.push(category_id);
  return category_id;
}

// 3. Au fur et a mesure, on veut stocker toutes les associations avec leurs catégories dans le tableau "associationsCategories".
const associationCategories = [];

// 2. Pour chaque association, on va lui associer 1 ou 2 catégories.
// Si la catégorie a déjà été associée à l'association, on relance la fonction
for (let assoId = 1; assoId <= 50; assoId++) {
  let categIdArray = [];
  for (let categNumber = 1; categNumber <= getRandomNumber(); categNumber++){
    associationCategories.push({
      associationId: assoId,
      categoryId: createUniqueRandomCatId(categIdArray),
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