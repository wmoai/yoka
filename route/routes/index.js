var model = require('../../model/');
var sha1 = require('sha1');

exports.index = function(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/field');
  }
  reply.view('index')
}

exports.login = function(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/field');
  }
  var name = request.payload.name
    , password = request.payload.password;
  model.user.findOne({where:{'name':name}}).then(function(user) {
    if (user) {
      var hash = sha1(password + user.solt);
      if (hash == user.password_hash) {
        request.auth.session.set({
          id: user.id,
          name: user.name
        });
        return reply.redirect('/field');
      }
      reply.view('index')
    } else {
      reply.view('index', {message: "login failed", name: name})
    }
  })
}

exports.logout = function(request, reply) {
  request.auth.session.clear();
  return reply.redirect('/');
}

exports.signup = function(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/field');
  }
  if (request.method === 'get') {
    reply.view('signup')
  } else if (request.method === 'post') {
    var name = request.payload.name
      , password = request.payload.password
      , confirm = request.payload.confirm;
    if (name == null || name == "" || password != confirm) {
      reply.view('signup', {message: "register error", name: name})
    } else {
      var solt = sha1(Math.random())
      var passwordHash = sha1(password+solt)
      model.user.create({
        name: name,
        password_hash: passwordHash,
        solt: solt
      }).then(function(user) {
        if (user) {
          request.auth.session.set({
            id: user.id,
            name: user.name
          });
          model.location.create({
            user_id: user.id,
            field_id: 1
          }).then(function(location) {
            return reply.redirect('/field');
          })
        } else {
          reply.view('signup', {hoge: "register error"})
        }
      })
    }
  }
}


