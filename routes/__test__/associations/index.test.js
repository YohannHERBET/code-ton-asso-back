const app = require('../../../module/app');
const request = require('supertest');
const db = require('../../../models');

describe('associations routes test', () => {

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMywiZW1haWwiOiJ6b3phd3ViQG1haWxpbmF0b3IuY29tIiwiZGV2ZWxvcGVySWQiOm51bGwsImFzc29jaWF0aW9uSWQiOjUyLCJpYXQiOjE2NzgxNzk3OTcsImV4cCI6MTY3ODE4MzM5N30.4uvUwQkdUpOnNs24Wd6kh5b-tg0g9KZ9r3JDnfpaUbA';

  it('should return 201 on association creation', async () => {
    const response = await request(app).post('/api/auth/create-asso').send({
      email: 'albert@gmail.com',
      password: '123',
      firstname: 'Albert',
      lastname: 'BRU',
      description: 'Vous allez me faire le plaisir devous remuez un peu les miches, Sire, j’ai l’impression de me battre contre une vieille! Ah non, non! Y a pas de pécor pour la quête du Graal! Enfin… À moins ça ait changé? Je suis chef de guerre moi, je suis pas là pour secouer des drapeaux et jouer de la trompette.',
      rna: 'W313006163',
      association_name: 'Les restos du coeur',
      slug: 'les-restos-du-coeur',
      categories: ['1', '2', '3'],
    });
    expect(response.statusCode).toEqual(201);
  });

  it('should return 200 on /api/associations', async () => {
    const response = await request(app).get('/api/associations');
    expect(response.statusCode).toEqual(200);
  });

  it('should return 200 on /api/associations/latest', async () => {
    const response = await request(app).get('/api/associations/latest');
    expect(response.statusCode).toEqual(200);
  });

  it('should retrieve our freshly created association', async () => {
    const response = await request(app).get('/api/associations/les-restos-du-coeur');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('association_name', 'Les restos du coeur');
  });

  it('should return 200 on association deletion', async () => {
    const response = await request(app)
    .delete('/api/associations/1')
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.statusCode).toEqual(200);
  });

  it('should return 401 on association deletion without token', async () => {
    const response = await request(app)
    .delete('/api/associations/1');
    expect(response.statusCode).toEqual(401);
  });
});