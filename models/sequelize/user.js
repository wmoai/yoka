module.exports = function(Sequelize, sequelize){
  return sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password_hash: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    solt_hash: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  })
};

