const db = require("../models");

// Defining methods for the CocktailsController
module.exports = {
  findAll: function(req, res) {
    db.Cocktail
      .find(req.params.drinkId)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // findById: function(req, res) {
    favoriteCocktails: function(req, res) {
      console.log(req.params)
      db.Cocktail
        .find({uid: req.params.id})
        .then(dbModel => {
          console.log(dbModel)
          res.json(dbModel)})
        .catch(err => res.status(422).json(err));
    },
  // create: function(req, res) {
  saveCocktail: function(req, res) {
    console.log("WORKS")
    db.Cocktail
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Cocktail
      .findOneAndUpdate({ uid: req.user.uid }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Cocktail
      .findById({ uid: req.params.drinkId })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
