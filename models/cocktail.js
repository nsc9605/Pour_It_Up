const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  
  idDrink: {
    type: String,
    required: true,
  },
  
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  
  preparation: {
    type: String,
    required: true,
  },
  
  ingredients: {
    type: [String],
    required: true,
  },

  measurements: {
    type: [String],
    required: true,
  },

  glassware: {
    type: Array,
    required: true,
  },

  // link: { type: String },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Cocktail = mongoose.model("Cocktail", cocktailSchema);

module.exports = Cocktail;
