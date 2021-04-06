const router = require("express").Router();
const drinkIdController = require("../../controllers/drinkIdController");

router.route("/:drinkId").get(drinkIdController.selectDrink);

router.route("/").post(drinkIdController.saveCocktail);
console.log("WORKS");
//   .post(function(req, res){
// console.log("WORKS")
//   })

// router.route("/:id").get(drinkIdController.favoriteCocktails);

module.exports = router;
