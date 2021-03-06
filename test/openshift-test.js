const OpenshiftTestAssistant = require('openshift-test-assistant');
const openshiftAssistant = new OpenshiftTestAssistant();
const test = require('ava');

test.before('setup', () => {
  return openshiftAssistant.deploy();
});

test('test openshift greeting with no query param', async t => {
  t.plan(1);
  const response = await openshiftAssistant.createRequest()
    .get('/api/greeting')
    .expect('Content-Type', /json/)
    .expect(200);
  t.is(response.body.content, 'Hello, World', 'Received message should math the expected one');
});

test('test openshift greeting with query param', async t => {
  t.plan(1);
  const response = await openshiftAssistant.createRequest()
    .get('/api/greeting?name=Luke')
    .expect('Content-Type', /json/)
    .expect(200);
  t.is(response.body.content, 'Hello, Luke', 'Received message should math the expected one');
});

test.after('teardown', () => {
  return openshiftAssistant.undeploy();
});
