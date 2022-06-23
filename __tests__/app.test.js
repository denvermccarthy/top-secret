const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  email: 'test@example.com',
  name: 'Example Name',
  password: 'hello world',
};
describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('post to /users should create a user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { name, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email,
      name,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
