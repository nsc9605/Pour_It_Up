import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://the-cocktail-db.p.rapidapi.com/filter.php',
  headers: {
    'x-rapidapi-key': '76154b20a6msh1c46e6b8ab8b5b5p1b1615jsn5419bb2d731f',
    'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
  }
};

// fetch("https://the-cocktail-db.p.rapidapi.com/filter.php", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "76154b20a6msh1c46e6b8ab8b5b5p1b1615jsn5419bb2d731f",
// 		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
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

