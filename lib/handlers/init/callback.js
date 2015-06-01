"use strict";

var restify = require('restify');
var async = require('async');
var Anyfetch = require('anyfetch');

var config = require('../../../config/configuration.js');

module.exports.get = function get(req, res, next) {
  async.waterfall([
    function fetchToken(cb) {
      if(!req.query.code) {
        return cb(new restify.ForbiddenError("code parameter is not defined"));
      }
      Anyfetch.getAccessToken(config.appId, config.appSecret, req.query.code, cb);
    },
    function showToken(token, cb) {
      res.redirect('http://chrome.anyfetch.com/?token=' + token);
      cb();
    }
  ], next);
};
