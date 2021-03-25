const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  measurements: [{ type: String, required: true }],
  served: { type: String, required: true },
  preparation: { type: String, required: true },
  garnish: { type: String, required: true },
  glassware: [{ type: String, required: true }],
  date: { type: Date, default: Date.now }
});

const Cocktail = mongoose.model("Cocktail", cocktailSchema);

module.exports = Cocktail;
