'use strict';

var glob = require('glob');

module.exports = function(server, sequelize, options) {
  options = options || {};
  options.files = options.files || './models/*.js';

  // load models
  var models = {};
  glob.sync(options.files, options).forEach(function(file) {
    if (file === 'index.js') return;
    models[file.slice(0, -3)] = sequelize.import(file);
  });

  // make models available to all requests
  server.use(function(req, res, next) {
    req.models = models;
    next();
  });
};
