const test = require('tape');
const OpenshiftTestAssistant = require('openshift-test-assistant');
const openshiftAssistant = new OpenshiftTestAssistant();
const path = require('path');
const request = require('supertest');

const vows = require('vows'),
  assert = require('assert');

vows.describe('')
  .addBatch({
  'setup': {
    topic: function () {
      return openshiftAssistant.deploy({
        'projectLocation': path.join(__dirname, '/..'),
        'strictSSL': false
      }).then(() => {
        vow.callback(null, "");
      }).catch(reason => {
        vow.callback(reason, null);
      })
    },

    'was successfull': function (err, stat) {
      assert.isNull (err);
    }
  }
  }).addBatch({
    'test openshift greeting with no query param' : function(){
      request(openshiftAssistant.getRoute())
        .get('/api/greeting')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          assert.equal(response.body.content, 'Hello, World', 'Received message should math the expected one');
        })
        .catch(reason => {
          assert.fail(reason);
        });
    },
    'test openshift greeting with query param' : function(){
      request(openshiftAssistant.getRoute())
        .get('/api/greeting?name=Luke')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          assert.equal(response.body.content, 'Hello, Luke', 'Received message should math the expected one');
        })
        .catch(reason => {
          assert.fail(reason);
        });
    }
  }).addBatch({
   'teardown' : function() {
     openshiftAssistant.undeploy()
       .then(() => {
         assert.ok('undeployed');
       }).catch(reason => {
         assert.fail(reason);
     });
   }
  })
  .run(); // Run it
