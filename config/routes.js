"use strict";
/**
 * @file Defines the routes available on the server
 *
 * Will define all availables exposed HTTP paths, and their methods (GET / POST / ...).
 */
var lib = require('../lib/');
var handlers = lib.handlers;
var middlewares = lib.middlewares;

// Routes client requests to handlers
module.exports = function(server) {
  server.get('/init/connect', handlers.init.connect.get);
  server.get('/init/callback', handlers.init.callback.get);

  server.get('/start', middlewares.auth, handlers.start.index.get);
};
