const app = require('../../../module/app');
const request = require('supertest');

describe('users routes test', () => {
  it('should return 200 on /api/users', async () => {
    const response = await request(app).get('/api/users');
    console.log(response.statusCode);
    expect(response.statusCode).toEqual(200);
  });
});
