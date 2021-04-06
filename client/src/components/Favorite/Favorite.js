import React, { useEffect, useState } from "react";
import { List, ListItem } from "../List";
// import handleSubmitFavorite from "../CocktailData/CocktailData";
//import Jumbotron from "../components/Jumbotron";
// import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  // useEffect(() => {
  //   loadFavorites();
  // }, []);

  function loadFavorites() {
    API.favoriteCocktails()
      .then((res) => {
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
        <List>
          {favorites.map((favorite) => {
            return (
              <ListItem key={favorite._id}>
                <h1 id="simple-modal-title">{favorite.strDrink}</h1>
                <div className="cocktailImage">
                  <img
                    src={favorite.strDrinkThumb}
                    alt={favorite.strDrink}
                    className="drinkImg"
                  />{" "}
                </div>

                {/* <DeleteBtn onClick={() => deleteCocktail(favorite._id)} /> */}

              </ListItem>
            );
          })}
        </List>
      ) : (
        <h3>No Favorites Yet ... Pour It Up!</h3>
      )}
    </div>
  );
}

export default Favorite;
