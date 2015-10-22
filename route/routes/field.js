var model = require('../../model/');
var sha1 = require('sha1');

exports.index = function(request, reply) {
  var userId = request.auth.credentials.id;
  model.location.findOne({where:{user_id: userId}}).then(function(location) {
    model.field.findOne({where:{id: location.field_id}}).then(function(field) {
      model.move.findAll({where:{origin_id: field.id}}).then(function(moves) {
        return reply.view('field', {field: field, moves: moves});
      })
    })
  })
}

exports.move = function(request, reply) {
  var userId = request.auth.credentials.id;
  var moveId = request.payload.id;
  model.location.findOne({where:{user_id: userId}}).then(function(location) {
    model.move.findOne({
      where: {
        id: moveId,
        origin_id: location.field_id
      }
    }).then(function(move) {
      if (move) {
        location.update({field_id: move.destination_id}).then(function() {
          return reply.redirect("/field?s="+sha1(Math.random()));
        })
      } else {
        return reply.redirect("/field?s="+sha1(Math.random()));
      }
    })
  })
}
