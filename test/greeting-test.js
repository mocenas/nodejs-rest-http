const supertest = require('supertest');
const app = require('../app');
const assert = require('assert');

describe('local tests', function(){
  this.timeout(60000);

  it('test out greeting route with no query param', async () => {
    const response = await supertest(app)
      .get('/api/greeting')
      .expect('Content-Type', /json/)
      .expect(200);
    assert.equal(response.body.content, 'Hello, World');
  });

  it('test out greeting route with a query param', async () => {
    const response = await supertest(app)
      .get('/api/greeting?name=Luke')
      .expect('Content-Type', /json/)
      .expect(200);
    assert.equal(response.body.content, 'Hello, Luke');
  });
});
