module.exports = function(sequelize, DataTypes) {
  var Winner = sequelize.define("Winner", {
    // Giving the Winners model a name of type STRING
    winnerName: DataTypes.STRING,
    raffleWon: DataTypes.STRING
  });
  return Winner;
};
