const { faker } = require('@faker-js/faker/locale/fr');

const users = [];

for (let index = 1; index <= 50; index++) {
  users.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    description: faker.company.bs(),
    developer_id: index,
    association_id: null,
    createdAt: new Date(),
    updatedAt: new Date()
  });

}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};