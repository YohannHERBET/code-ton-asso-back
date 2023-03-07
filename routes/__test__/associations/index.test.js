const app = require('../../../module/app');
const request = require('supertest');
const db = require('../../../models');

describe('associations routes test', () => {

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  let userToken2 = '';

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

  it('connexion should return a token', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'albert@gmail.com',
      password: '123',
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
    userToken2 = response.body.token;
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
    .set('Authorization', `Bearer ${userToken2}`);
    expect(response.statusCode).toEqual(200);
  });

  it('should return 401 on association deletion without token', async () => {
    const response = await request(app)
    .delete('/api/associations/1');
    expect(response.statusCode).toEqual(401);
  });
});