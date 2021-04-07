require("dotenv").config();
const Cocktail = require("../models/cocktail");
const axios = require("axios");

module.exports = {
  // findAll: function (req, res) {
  selectDrink: function (req, res) {
    // console.log(process.env.API_HOST);
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
        // console.log(response.data);
        res.json(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  },

  saveCocktail: function (req, res) {
    console.log(req.body);
    const {
      uid,
      idDrink,
      name,
      image,
      preparation,
      ingredients,
      measurements,
      glassware,
    } = req.body;


   Cocktail.create({
      uid,
      idDrink,
      name,
      image,
      preparation,
      ingredients,
      measurements,
      glassware,
    }).then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));;

    // Cocktail.all([drinkId])
    //   .then((drinkId) => res.json("/drink/:drinkId", { drinkId }))
    //   .catch((err) => next(err));
  },

  // favoriteCocktails: function (req, res) {
  //   const uid = req.params.user.uid;

  //   Cocktail.find(uid)
  //     // .populate("uid")
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  
};
