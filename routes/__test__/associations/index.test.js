const app = require('../../../module/app');
const request = require('supertest');

describe('associations routes test', () => {

  it('should return 200 on /api/associations', async () => {
    const response = await request(app).get('/api/associations');
    console.log(response.statusCode);
    expect(response.statusCode).toEqual(200);
  });

  it('should return 201 on association creation', async () => {
    const response = await request(app).post('/api/associations').send({
      name: 'test',
      description: 'test',
      email: 'albert@gmail.com',
      // Trouver le reste des champs
    });
    console.log(response.statusCode);
    expect(response.statusCode).toEqual(201);
  });
});