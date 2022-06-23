const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('secret route testing', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('get to /secrets should show a list of secrets', async () => {
    const { status, body } = await request(app).get('/api/v1/secrets');
    expect(status).toEqual(200);
    const secret = body.find((s) => s.id === '1');
    expect(secret.title).toEqual('Top Secret Info');
    expect(secret.description).toEqual('HTML is not a programming language');
  });
  afterAll(() => {
    pool.end();
  });
});
