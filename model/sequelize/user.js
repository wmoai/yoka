module.exports = function(Sequelize, sequelize){
  return sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    solt: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
  })
};

