const OpenshiftTestAssistant = require('openshift-test-assistant');
const openshiftAssistant = new OpenshiftTestAssistant();
const path = require('path');
const request = require('supertest');

// it does not work
beforeAll(async () => {
  await openshiftAssistant.deploy({
    'projectLocation': path.join(__dirname, '/..'),
    'strictSSL': false
  });
});

test('test openshift greeting with no query param', async () => {
  await expect(request(openshiftAssistant.getRoute())
      .get('/api/greeting')
      .expect('Content-Type', /json/)
      .expect(200))
    .resolves.toBe('Hello, World');
});

/*test('test openshift greeting with query param', (t) => {
  t.plan(1);
  if (!openshiftAssistant.isReady()) {
    t.skip('Application not ready, skipping the test');
  } else {
    request(openshiftAssistant.getRoute())
      .get('/api/greeting?name=Luke')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        t.equal(response.body.content, 'Hello, Luke', 'Received message should math the expected one');
      })
      .catch(reason => {
        t.fail(reason);
      });
  }
});*/

afterAll(() => {
  openshiftAssistant.undeploy()
    .then(() => {
      t.pass('Application successfully undeployed');
    }).catch(reason => {
      t.fail(reason);
  });
});
