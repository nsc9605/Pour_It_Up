const router = require("express").Router();
const drinkIdController = require("../../controllers/drinkIdController");


router.route("/:drinkId").get(drinkIdController.selectDrink);
router.route("/").post(drinkIdController.saveCocktail);
// router.route("/:uid").get(drinkIdController.favoriteCocktails);
console.log("WORKS");


module.exports = router;
