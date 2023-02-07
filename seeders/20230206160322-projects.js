const { faker } = require('@faker-js/faker/locale/fr');

projects = [];

for (let index = 1; index <= 10; index++) {
  projects.push({
    title: "Projet de " + faker.company.name(),
    description: faker.lorem.paragraph(),
    other_features: faker.lorem.paragraph(),
    release_date: new Date(),
    slug: faker.helpers.slugify(faker.company.name()),
    visible: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type_id: faker.datatype.number({ min: 1, max: 3 }), 
    association_id: faker.datatype.number({ min: 1, max: 50 }),
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', projects, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};