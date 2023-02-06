const { faker } = require('@faker-js/faker/locale/fr');

const associations = [];

for (let index = 1; index <= 50; index++) {
  associations.push({
    rna: faker.datatype.string(16),
    association_name: faker.company.name(),
    slug: faker.helpers.slugify(faker.company.name()),
    createdAt: new Date(),
    updatedAt: new Date()
  });

}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Associations', associations, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Associations', null, {});
  }
};