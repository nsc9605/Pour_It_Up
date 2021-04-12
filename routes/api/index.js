const router = require("express").Router();
const cocktailRoutes = require("./cocktails");
const searchRoutes = require("./search");
const drinkRoutes = require("./drink");

// cocktail routes
router.use("/cocktails", cocktailRoutes);
router.use("/search", searchRoutes);
router.use("/drink", drinkRoutes);

module.exports = router;