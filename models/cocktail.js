const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// process.env.ATLAS_URI, process.env.MONGODB_URI, "" 

const cocktailSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  ingredients: { type: Array },
  preparation: { type: String, required: true },
  measurements: { type: Number },
  category: { type: String, required: true },
  glassware: { type: Array, required: true },
  link: { type: String },
  date: { type: Date, default: Date.now }
});

const Cocktail = mongoose.model("Cocktail", cocktailSchema);

module.exports = Cocktail;
