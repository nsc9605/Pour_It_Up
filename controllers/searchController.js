require("dotenv").config();
const axios = require("axios");

module.exports = {
  findAll: function (req, res) {
    console.log(process.env.API_HOST);
    const options = {
      method: "GET",
      // url: "https://the-cocktail-db.p.rapidapi.com/filter.php",
      // url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php",
      url: "https://the-cocktail-db.p.rapidapi.com/random.php",
      // params: { i: "lime" },
      headers: {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": process.env.API_HOST,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        res.json(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  },
};

// const ingredientSearch = {
//   method: "GET",
//   url: "https://the-cocktail-db.p.rapidapi.com/filter.php?i=",
//   headers: {
//     "x-rapidapi-key": process.env.API_KEY,
//     "x-rapidapi-host": process.env.API_HOST,
//   },
// };
// axios
//   .request(ingredientSearch)
//   .then(function (response) {
//     console.log(response.data);
//     res.json(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

//   const details = {
//     method: 'GET',
//     url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php?i=',
//     headers: {
//       "x-rapidapi-key": process.env.API_KEY,
//       "x-rapidapi-host": process.env.API_HOST,
//     },
//   };
//   axios
//   .request(details)
//   .then(function (response) {
//     console.log(response.data);
//     res.json(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
