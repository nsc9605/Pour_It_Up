require("dotenv").config();
const axios = require("axios");

module.exports = {
  findIng: function (req, res) {
    console.log(process.env.API_HOST);
    const options = {
      method: "GET",
      url: "https://the-cocktail-db.p.rapidapi.com/filter.php",
      params: { i: req.params.ing },
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
