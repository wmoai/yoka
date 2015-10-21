var Hapi = require('hapi')
var server = new Hapi.Server()
server.connection({
  port: "3000"
})

server.register(require('vision'), function (err) {
  server.views({
    engines: { jade: require('jade') },
    path: __dirname + "/views",
    compileOptions: {
      pretty: true
    }
  })
})

server.start(function() {
  console.log("Server running at: ", server.info.uri)
})


var Sequelize = require('sequelize')
var sequelize = new Sequelize('yoka', 'user', 'password')
var User = sequelize.define('User', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});
sequelize.sync().then(function() {
  return User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
}).then(function(jane) {
  console.log(jane.get({
    plain: true
  }))
});

server.route({
  method: "GET",
  path: "/",
  handler: function(req, res) {
    res.view('index')
  }
})

server.route({
  method: "GET",
  path: "/signup",
  handler: function(req, res) {
    res.view('signup')
  }
})

server.route({
  method: "POST",
  path: "/signup",
  handler: function(req, res) {
    console.log(req.payload)
    res.view('signup', {hoge: "fuga"})
  }
})


server.route({
  method: "GET",
  path: "/field",
  handler: function(req, res) {
    res('field : ' + req.params.name)
  }
})


