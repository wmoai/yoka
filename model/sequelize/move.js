module.exports = function(Sequelize, sequelize){
  return sequelize.define('Move', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    origin_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    destination_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    moral: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
  })
};

