const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// process.env.ATLAS_URI, process.env.MONGODB_URI, "" 

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/cocktailsdb",
  process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});


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
