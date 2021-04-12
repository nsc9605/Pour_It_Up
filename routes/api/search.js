const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// cocktail routes
router.route("/:ing").get(searchController.findIng);

module.exports = router;