const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const mockUser = {
  email: 'test@example.com',
  name: 'Example Name',
  password: 'hello world',
};
const signUp = async () => {
  return await request(app).post('/api/v1/users').send(mockUser);
};
describe('user route testing', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('post to /users should create a user', async () => {
    const res = await signUp();
    const { name, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email,
      name,
    });
  });
  test('post to /sessions should sign in an existing user', async () => {
    await signUp();
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'test@example.com', password: 'hello world' });
    expect(res.status).toEqual(200);
  });

  test('delete to /sessions should sign in an existing user', async () => {
    await signUp();
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'test@example.com', password: 'hello world' });
    const out = await request(app).delete('/api/v1/users/sessions');
    expect(res.status).toEqual(200);
    expect(out.body.message).toEqual('signed out succesfully');
  });
  afterAll(() => {
    pool.end();
  });
});
