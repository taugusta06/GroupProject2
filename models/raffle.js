module.exports = function(sequelize, DataTypes) {
  var Raffle = sequelize.define("Raffle", {
    // Giving the Raffle model a name of type STRING
    raffleName: DataTypes.STRING,
    entryCount: DataTypes.INTEGER
  });
  
  return Raffle;
};
