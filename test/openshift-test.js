const OpenshiftTestAssistant = require('openshift-test-assistant');
const openshiftAssistant = new OpenshiftTestAssistant();
const path = require('path');
const request = require('supertest');


module.exports = {
  setUp: function (callback) {
    openshiftAssistant.deploy({
      'projectLocation': path.join(__dirname, '/..'),
      'strictSSL': false
    }).then(() => {
      callback();
    }).catch(reason => {
      callback.fail(reason); // no idea if this really works
    });
  },

  tearDown: function (callback) {
    openshiftAssistant.undeploy()
      .then(() => {
        callback();
      }).catch(reason => {
        callback();
    });
  },

  test1: function (test) {
    if (!openshiftAssistant.isReady()) {
      t.skip('Application not ready, skipping the test');
    } else {
      request(openshiftAssistant.getRoute())
        .get('/api/greeting')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          test.equal(response.body.content, 'Hello, World', 'Received message should math the expected one');
          test.done();
        })
        .catch(reason => {
          test.fail(reason);
          test.done();
        });
    }
  }
};

