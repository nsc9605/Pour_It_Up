const router = require("express").Router();
const cocktailsController = require("../../controllers/cocktailsController");

// Matches with "/api/cocktails"
router.route("/")
  .get(cocktailsController.findAll)
  // .post(cocktailsController.saveCocktail);

// Matches with "/api/cocktails/:id"
router
  .route("/:id")
  .get(cocktailsController.favoriteCocktails)
  .put(cocktailsController.update)

  router.route("/:key")
  .delete(cocktailsController.deleteCocktail);


module.exports = router;
