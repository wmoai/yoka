var model = require('../../model/');

exports.index = function(request, reply) {
  var userId = request.auth.credentials.id
  model.location.findOne({where:{user_id: userId}}).then(function(location) {
    model.field.findOne({where:{id: location.field_id}}).then(function(field) {
      model.move.findAll({where:{origin_id: field.id}}).then(function(moves) {
        return reply.view('field', {field: field, moves: moves});
      })
    })
  })
}

exports.move = function(request, reply) {

}
