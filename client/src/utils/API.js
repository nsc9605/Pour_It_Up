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
