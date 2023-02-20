const { faker } = require('@faker-js/faker/locale/fr');

const developers = [];

for (let index = 1; index <= 50; index++) {
  developers.push({
    type: faker.helpers.arrayElement(['Frontend', 'Backend', 'Fullstack']),
    work_preferences: faker.helpers.arrayElement(['Solo', 'Group', 'Both']),
    level: faker.helpers.arrayElement(['Junior', 'Intermediate', 'Senior']),
    slug: faker.helpers.slugify(faker.name.firstName() + ' ' + faker.name.lastName()),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Developers', developers, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Developers', null, {});
  }
};