/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  search: function () {
    return axios.get('/api/search')
  }
  // search query 
  // searchIngredient: function(query) {
  //   return axios.get('/api/search' + query)
  // }

}


  // ingredientSearch: function (ingredientSearch) {
  //   return axios.get('/api/search' + ingredientSearch)
  // },
  // details: function (details) {
  //   return axios.get('/api/search' + details)
  // },

  // Save cocktail to database
  // saveRecipe: function () {
  //   return axios.post('/api/search')
  // },

  // // Get saved cocktails from database
  // savedCocktail: function () {
  //   return axios.get('/api/search')
  // },
  

