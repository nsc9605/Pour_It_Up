const router = require("express").Router();
const cocktailRoutes = require("./cocktails");
const searchRoutes = require("./search");

// cocktail routes
router.use("/cocktails", cocktailRoutes);
router.use("/search", searchRoutes);


module.exports = router;
