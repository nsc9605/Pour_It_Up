const router = require("express").Router();
const drinkIdController = require('../../controllers/drinkIdController');


router.route("/:drinkId")
  .get(drinkIdController.selectDrink)
  .post(drinkIdController.saveCocktail)

router.route("/:id")
  .get(drinkIdController.favoriteCocktails)


module.exports = router;