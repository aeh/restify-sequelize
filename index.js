'use strict';

var glob = require('glob'),
    path = require('path');

module.exports = function(server, sequelize, options) {
  options = options || {};
  options.files = options.files || '*.js';
  options.cwd = options.cwd || './models';

  // load models
  var models = {};
  glob.sync(options.files, options).forEach(function(file) {
    var name = path.basename(file, path.extname(file));
    models[name] = sequelize.import(options.cwd + '/' + file);
  });

  // make models available to all requests
  server.use(function(req, res, next) {
    req.models = models;
    next();
  });
};
