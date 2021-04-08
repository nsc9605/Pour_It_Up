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

  saveFavorite:  function () {
    return axios.post('/api/drink');
  },

  favoriteCocktails: function(uid) {
    return axios.get('/api/cocktails/' + uid);
  },

  deleteCocktail: function(_id) {
    return axios.delete('/api/drink/' + _id);
  }
}

