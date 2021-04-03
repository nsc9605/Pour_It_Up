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

  saveCocktail:  function (drinkData) {
    return axios.post('/api/drink', drinkData);
  },

  favoriteCocktails: function() {
    return axios.get('/api/drink');
  }
}

