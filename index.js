'use strict';

var glob = require('glob'),
    path = require('path');

module.exports = function(server, sequelize, options) {
  options = options || {};
  options.files = options.files || './models/*.js';
  var cwd = options.cwd || process.cwd();

  // load models
  var models = {};
  glob.sync(options.files, options).forEach(function(file) {
    var name = path.basename(file, path.extname(file));
    models[name] = sequelize.import(cwd + '/' + file);
  });

  // make models available to all requests
  server.use(function(req, res, next) {
    req.models = models;
    next();
  });
};
