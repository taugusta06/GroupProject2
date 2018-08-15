module.exports = function (sequelize, DataTypes) {
    var Raffle = sequelize.define("Raffle", {
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    });
    return Raffle;
};

// Example of how to create a raffle

// db.Raffle.create({
//     name: "Tuckers Raffle",
//     description: "This is a raffle for testing!"
// }).then(res => {
//     console.log(res);
// });