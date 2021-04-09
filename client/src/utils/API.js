/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  search: function () {
    return axios.get('/api/search')
  },
  
  searchIng: function (ing) {
    return axios.get('/api/search/' + ing)
  },

  selectDrink: function (drinkId) {
    return axios.get('/api/drink/' + drinkId)
  },

  saveCocktail: function (drinkObj) {
    console.log(drinkObj);
    return axios.post('/api/drink/', drinkObj);
  },

  favoriteCocktails: function(uid) {
    return axios.get('/api/cocktails/' + uid);
  },

  deleteCocktail: function(key) {
    console.log(key);
    return axios.delete('/api/drink/' + key);
  }
}

