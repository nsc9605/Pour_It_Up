const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// cocktail routes
router.route("/")
  .get(searchController.findAll)
//   .post(cocktailsController.create);



module.exports = router;