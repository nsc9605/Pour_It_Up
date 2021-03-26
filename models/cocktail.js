const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// process.env.ATLAS_URI, process.env.MONGODB_URI, "" 

const cocktailSchema = new Schema({
  name: { type: String, required: true },
  ingredients: { type: Array, required: true },
  measurements: { type: Number, required: true },
  served: { type: String, required: true },
  preparation: { type: String, required: true },
  garnish: { type: String, required: true },
  glassware: { type: Array, required: true },
  image: { type: String },
  link: { type: String },
  date: { type: Date, default: Date.now }
});

const Cocktail = mongoose.model("Cocktail", cocktailSchema);

module.exports = Cocktail;
