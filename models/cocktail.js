const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  
  preparation: {
    type: String,
    required: true,
  },
  
  ingredients: {
    type: Array,
    required: true,
  },

  measurement: {
    type: Array,
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
