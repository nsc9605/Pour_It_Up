const router = require("express").Router();
const cocktailRoutes = require("./cocktails");

// cocktail routes
router.use("/cocktails", cocktailRoutes);

module.exports = router;
