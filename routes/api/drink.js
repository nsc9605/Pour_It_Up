const router = require("express").Router();
const drinkIdController = require('../../controllers/drinkIdController');


router.route("/:drinkId")
  .get(drinkIdController.selectDrink)


module.exports = router;