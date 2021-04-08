import React, { useEffect, useState, useContext } from "react";
// import handleSubmitFavorite from "../CocktailData/CocktailData";
//import Jumbotron from "../components/Jumbotron";
//import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";
import { UserContext } from "../../Providers/UserProvider";


function Favorite() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    loadFavorites();
  }, []);

  function loadFavorites() {
    API.favoriteCocktails(user.uid)
      .then((res) => {
        console.log(res.data);
        setFavorites(res.data)
      })
      .catch((err) => console.log(err));
  }


  function deleteCocktail(id) {
      API.deleteCocktail(id)
      .then((res) => {
          loadFavorites();
      })
  }

  return (
    <div>
      <h1>Favorite Drinks</h1>

      {favorites.length ? (
          // <table className="table">
          //       <thead>
          //           <tr>
          //               <th >Photo</th>
          //               <th >Cocktail Name</th>
          //               <th >Remove from List</th>
          //           </tr>
          //       </thead>
                <div class="flip-card">
     {favorites.map(favorite => (
       <div class="flip-card-inner">
         <div className="flip-card-front" key={favorite._id}>
         {/* <tbody> */}
         {/* <tr key={favorite._id}> */}
         <img src={favorite.image} alt={favorite.name} className="drinkImg" key={favorite._id}/>
         <h1>{favorite.name}</h1>
                   <p>{favorite.glass}</p>
                  </div>
                  <div class="flip-card-back">
                    <h1>{favorite.name}</h1>
                    <p>{favorite.preparation}</p>
                    <p>{favorite.ingredients}</p>
           </div>
           {/* <td><img src={favorite.image} alt={favorite.name} className="drinkImg" /></td>
           <td>{favorite.name}</td> */}
           {/* <td><DeleteBtn onClick={() => deleteCocktail(favorite.idDrink)} /> </td> */}
         {/* </tr> */}
         {/* </tbody> */}
         </div>
        ))}          
         {/* </table> */}
      </div>

      ) : (
        <h3>No Favorites Yet ... Pour It Up!</h3>
      )}
    </div>
  );
}

export default Favorite;