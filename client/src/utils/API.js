import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://the-cocktail-db.p.rapidapi.com/filter.php',
  headers: {
    'x-rapidapi-key': process.env.API_KEY,
    'x-rapidapi-host': process.env.API_HOST
  }
};

// fetch("https://the-cocktail-db.p.rapidapi.com/filter.php", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": process.env.API_KEY,
// 		"x-rapidapi-host": process.env.API_HOST
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

