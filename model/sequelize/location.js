module.exports = function(Sequelize, sequelize){
  return sequelize.define('Location', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    field_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
  })
};

