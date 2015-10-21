var fs = require('fs')
var Sequelize = require('sequelize')
var sequelize = new Sequelize('yoka', 'user', 'password')

fs.readdirSync(__dirname + '/sequelize').forEach(function(filename) {
  if (/\.js$/.test(filename)) {
    var name = filename.substr(0, filename.lastIndexOf('.'));
    exports.__defineGetter__(name, function() {
      return require('./sequelize/' + name)(Sequelize, sequelize);
    });
  }
});
