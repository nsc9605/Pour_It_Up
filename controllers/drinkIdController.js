require("dotenv").config();
const Cocktail = require("../models/cocktail");
const axios = require("axios");

module.exports = {
  // findAll: function (req, res) {
  selectDrink: function (req, res) {
    console.log(process.env.API_HOST);
    const drinkTarget = {
      method: "GET",
      url: "https://the-cocktail-db.p.rapidapi.com/lookup.php?",
      params: { i: req.params.drinkId },
      headers: {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": process.env.API_HOST,
      },
    };
    axios
      .request(drinkTarget)
      .then(function (response) {
        console.log(response.data);
        res.json(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  },

  saveCocktail: function (req, res) {
    const {
      name,
      image,
      preparation,
      ingredients,
      strOwner,
      glassware,
    } = req.body;
    const addCocktail = Cocktail.create({
      name,
      image,
      preparation,
      ingredients,
      strOwner: req.user.uid,
      glassware,
    });

    Cocktail.all([addCocktail])
      .then(() => res.redirect("/cocktails/favorites"))
      .catch((err) => next(err));
  },

  favoriteCocktails: function (req, res) {
    const uid = req.params.drinkId;

    Cocktail.findById(uid)
      .populate("strOwner")
      .then((cocktailDetails) =>
        res.render("cocktails/favorites", { cocktailDetails })
      )
      .catch((err) => next(err));
  },
};
