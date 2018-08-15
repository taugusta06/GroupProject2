var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Raffle.findAll({}).then(function(dbRaffles) {
      console.log(dbRaffles);
      res.render("index", {
        msg: "Welcome!",
        raffles: dbRaffles
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  // try to add another get for our start page
  app.get("/start", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("start", {
        msg: "Running Raffles!",
        raffles: raffleName
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
