const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// cocktail routes
router.route("/:ing").get(searchController.findIng);

// router.route("/")
//   .get(cocktailsController.findAll)
//   .post(cocktailsController.create);

module.exports = router;
