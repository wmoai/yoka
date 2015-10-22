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

var route = require('./route/');
var model = require('./model/');

server.register(require('hapi-auth-cookie'), function (err) {
  server.auth.strategy('session', 'cookie', {
    password: 'secret',
    cookie: 'sid-example',
    redirectTo: '/',
    isSecure: false
  });
});


server.route([
  {
    method: "GET",
    path: "/",
    config: {
      handler: route.index.index,
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  },
  {
    method: "POST",
    path: "/",
    config: {
      handler: route.index.login,
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  },
  {
    method: ["GET", "POST"],
    path: "/signup",
    config: {
      handler: route.index.signup,
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  },
  {
    method: "GET",
    path: "/logout",
    config: {
      handler: route.index.logout,
      auth: 'session'
    }
  },


  {
    method: "GET",
    path: "/field",
    config: {
      handler: route.field.index,
      auth: "session"
    }
  }
])

server.start(function() {
  console.log("Server running at: ", server.info.uri)
})

