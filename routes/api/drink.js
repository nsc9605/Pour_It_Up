const router = require("express").Router();
const drinkIdController = require("../../controllers/drinkIdController");

router.route("/:drinkId").get(drinkIdController.selectDrink);
router.route("/").post(drinkIdController.saveCocktail);
console.log("WORKS");

module.exports = router;