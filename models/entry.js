module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define("Entry", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    ticket: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Entry;
};
