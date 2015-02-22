'use strict';

require('should');
var request = require('supertest');

var app = require('../app.js');
var helpers = require('./helpers.js');
var config = require('../config/configuration.js');


describe('Auth handlers', function() {
  describe('GET /init/connect', function() {
    it("should redirect to the AnyFetch grant page", function(done) {
      request(app)
        .get('/init/connect?state=v2')
        .expect(302)
        .expect('Location', 'http://localhost:8001/oauth/authorize?client_id=test&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Finit%2Fcallback%3Fstate%3Dv2')
        .end(done);
    });
  });

  describe('GET /init/callback', function() {
    it("should redirect to the 'localhost/done' location with the token", function(done) {
      request(app)
        .get('/init/callback?code=test')
        .expect(302)
        .expect('Location', config.doneEndpoint + helpers.MOCK_SERVER_TOKEN)
        .end(done);
    });
  });
});
