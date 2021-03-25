const router = require("express").Router();
const cocktailsController = require("../../controllers/cocktailsController");

// Matches with "/api/cocktails"
router.route("/")
  .get(cocktailsController.findAll)
  .post(cocktailsController.create);

// Matches with "/api/cocktails/:id"
router
  .route("/:id")
  .get(cocktailsController.findById)
  .put(cocktailsController.update)
  .delete(cocktailsController.remove);

module.exports = router;
