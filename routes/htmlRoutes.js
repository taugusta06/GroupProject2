var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Raffle.findAll({}).then(function(dbRaffle) {
      console.log(dbRaffle);
      res.render("index", {
        msg: "Welcome To Our Raffle Page!",
        Raffle: dbRaffle
      });
    });
  });

  // Load raffle page and pass in an raffle by id
  app.get("/raffle/:id", function(req, res) {
    db.Raffle.findOne({ where: { id: req.params.id } }).then(function(dbRaffle) {
      res.render("raffle", dbRaffle);
    });
  });

  //load up ad raffle page
  app.get("/raffle", function(req, res) {
    res.render("addRaffle");
  });

  //winners list
  app.get("/winners", function(req, res) {
    res.render("winners");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
