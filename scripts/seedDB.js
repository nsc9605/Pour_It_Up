require("dotenv").config();
const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Cocktails collection and inserts the cocktails below
console.log(process.env.ATLAS_URI)
mongoose.connect(process.env.ATLAS_URI || "mongodb://localhost/cocktailsdb");

const cocktailSeed = [
  {
    name: "Espresso Martini",
    ingredients: ["Vodka", "Kahlua", "Espresso", "Simple Syrup"],
    measurements: ["2oz", "1oz", "1oz", ".5oz"],
    served: "Shaken; up",
    preparation:
      "Chill the glass with ice and water then pour all ingredients in shaker over ice. Shake contents for minimum 20 seconds to get the frothy crema. Tap and swirl shaker to get all the foam. Pour out ice and water from prepped glass and strain ingredients over chilled glass, garnish with 3 coffee beans.",
    garnish: "3 coffee beans",
    glassware: ["Martini Glass", "Coup"],
    date: new Date(Date.now()),
  },
  {
    name: "Whiskey Sour",
    ingredients: [
      "Bourbon",
      "Fresh Lemon Juice",
      "Simple Syrup",
      "Egg White",
      "Angostura Bitters",
    ],
    measurements: ["2oz", "3/4oz", "1/2oz", "1oz", "3 drops"],
    served: "Shaken; on the rocks",
    preparation:
      "Place the bourbon, lemon juice, simple syrup, and egg white in a cocktail shaker without ice. Shake vigorously for 10 seconds, to incorporate the egg white. Add ice and shake for 10 more seconds. Strain ingredients over glass. Stroke bitters a few times over foam.",
    garnish: "Bitters",
    glassware: ["Coup", "Rocks Glass"],
    date: new Date(Date.now()),
  },
  {
    name: "Penicillin",
    ingredients: [
      "Blended Scotch",
      "Islay Scotch",
      "Honey-Ginger Syrup",
      "Fresh Lemon Juice",
    ],
    measurements: ["2oz", "1/4oz", "3/4oz", "3/4oz"],
    served: "Shaken, on the rocks",
    preparation:
      "Add Blended Scotch, lemon juice, and honey-ginger syrup into shaker, add ice and shake ingredients. Strain over ice into rocks glass. Float the Islay scotch on top using bar spoon. Garnish with candied ginger or lemon peel.",
    garnish: "candied ginger or lemon peal",
    glassware: ["Rocks Glass"],
    date: new Date(Date.now()),
  },
  {
    name: "Negroni",
    ingredients: ["London Dry Gin", "Campari", "Sweet Vermouth"],
    measurements: ["1oz", "1oz", "1oz"],
    served: "Sirred, on the rocks",
    preparation:
      "Add the ingredients to a glass and fill with plenty of ice . Stir with bar spoon to dilute and bring the temperature down. Strain into rocks glass with one large cube. Garnish with orange peel",
    garnish: "orange peel",
    glassware: ["rocks glass"],
    date: new Date(Date.now()),
  },
  {
    name: "Aperol Spritz",
    ingredients: ["Aperol", "Prosecco", "Soda Water"],
    measurements: ["2oz", "3oz", "1oz"],
    served: "On the rocks; poured over ice",
    preparation:
      "Fill wine glass (stem or stemless) with ice and pour the Aperol, then the Prosecco and then splash with club soda. Add orange slice.",
    garnish: "orange slice",
    glassware: ["wine glass"],
    date: new Date(Date.now()),
  },
];

db.Cocktail.remove({})
  .then(() => db.Cocktail.collection.insertMany(cocktailSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });