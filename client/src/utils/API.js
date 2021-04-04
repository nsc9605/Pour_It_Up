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

  saveCocktail:  function (drinkId) {
    return axios.post('/api/drink', drinkId);
  },

  favoriteCocktails: function(id) {
    return axios.get('/api/drink' + id);
  },

  remove: function (id) {
    return axios.delete('/api/cocktails' + id)
  }
}

