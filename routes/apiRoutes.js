var db = require("../models");

module.exports = function(app) {
  // Get all entries
  app.get("/api/entries", function(req, res) {
    db.Entry.findAll({}).then(function(dbEntries) {
      res.render("showentries", {Entry: dbEntries});

    });
  });

  // Create a new entry
  app.post("/api/entries", function(req, res) {
    db.Entry.create(req.body).then(function(dbEntry) {
      res.json(dbEntry);
    });
  });

  // Delete an example by id
  app.delete("/api/entry/:id", function(req, res) {
    db.entries
      .destroy({ where: { id: req.params.id } })
      .then(function(dbEntry) {
        res.json(dbEntry);
      });
  });
  // Get all raffles
  app.get("/api/raffles", function(req, res) {
    db.Raffle.findAll({}).then(function(dbRaffles) {
      res.json(dbRaffles);
    });
  });

  // Create a new example
  app.post("/api/raffles", function(req, res) {
    console.log(req.body);
    db.Raffle.create(req.body).then(function(dbRaffle) {
      res.json(dbRaffle);
    });
  });

  // Delete an example by id
  app.delete("/api/raffle/:id", function(req, res) {
    db.Raffle.destroy({ where: { id: req.params.id } }).then(function(dbRaffle) {
      res.json(dbRaffle);
    });
  });
};
