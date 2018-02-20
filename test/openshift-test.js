const path = require('path');
const request = require('supertest');
const assert = require('assert');
const OpenshiftTestAssistant = require('openshift-test-assistant');
const openshiftAssistant = new OpenshiftTestAssistant({
  'projectLocation': path.join(__dirname, '/..'),
  'strictSSL': false
});

describe('Openshift http', function () {
  this.timeout(600000);

  before(() => {
    return openshiftAssistant.deploy();
  });

  it('openshift greeting with no query param', async () => {
    const response = await request(openshiftAssistant.getRoute())
      .get('/api/greeting')
      .expect('Content-Type', /json/)
      .expect(200);
    assert.equal(response.body.content, 'Hello, World');
  });

  it('openshift greeting with query param', async () => {
    const response = await request(openshiftAssistant.getRoute())
      .get('/api/greeting?name=Luke')
      .expect('Content-Type', /json/)
      .expect(200);
    assert.equal(response.body.content, 'Hello, Luke');
  });

  after(() => {
    return openshiftAssistant.undeploy();
  });
});
