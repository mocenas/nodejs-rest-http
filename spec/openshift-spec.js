const OpenshiftTestAssistant = require('openshift-test-assistant');
const openshiftAssistant = new OpenshiftTestAssistant();
const path = require('path');
const request = require('supertest');

jasmine.DEFAULT_TIMEOUT_INTERVAL=600000;

describe("Greeting function test", function() {
  beforeAll(function(done) {
    openshiftAssistant.deploy({
      'projectLocation': path.join(__dirname, '/..'),
      'strictSSL': false
    }).then(() => {
      done();
      // expect(true).toBe(true).because('Application is deployed'); // indicate success
    }).catch(reason => {
      done.fail(reason);
    });
  });

  it('openshift greeting with no query param', function(done) {
    request(openshiftAssistant.getRoute())
      .get('/api/greeting')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.content).toBe('Hello, World');
        done();
      })
      .catch(reason => {
        done.fail(reason);
      });
  });

  it('openshift greeting with query param', function(done) {
      request(openshiftAssistant.getRoute())
        .get('/api/greeting?name=Luke')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.content).toBe('Hello, Luke');
          done();
        })
        .catch(reason => {
          done.fail(reason);
        });
  });

  afterAll(function(done) {
    openshiftAssistant.undeploy()
      .then(() => {
        done();
      }).catch(reason => {
        done.fail(reason);
    });
  });
});
