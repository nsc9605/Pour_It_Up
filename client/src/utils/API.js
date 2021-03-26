import axios from "axios";
require("dotenv").config();

const options = {
  method: "GET",
  url: "https://the-cocktail-db.p.rapidapi.com/filter.php",
  headers: {
    "x-rapidapi-key": process.env.API_KEY,
    "x-rapidapi-host": process.env.API_HOST,
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

export default options;
