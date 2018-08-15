module.exports = function(sequelize, DataTypes) {
  var Raffle = sequelize.define("Raffle", {
    // Giving the Raffle model a name of type STRING
    raffleName: DataTypes.STRING,
    entryCount: DataTypes.INTEGER
  });
  // Raffle.associate = function(models) {
  //   Raffle.hasMany(models.Entry, {
  //     onDelete: "CASCADE",
  //     foreignKey: "raffleName",
  //     targetKey: "ticket"
  //   });
  // };
  return Raffle;
};
