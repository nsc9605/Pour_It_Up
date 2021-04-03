import React, { useEffect, useState } from "react";
import { List, ListItem } from "../List";
//import Jumbotron from "../components/Jumbotron";
import API from "../../utils/API";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => { loadFavorites() }, []);
    
    function loadFavorites() {
        API.favoriteDrinks()
        .then((res) => setFavorites(res.data))
        .catch((err) => console.log(err));
    }

    return(
        <div>
            
              <h1>Favorite Drinks</h1>
           
            {favorites.length ? (
              <List>
                {favorites.map(favorite => {
                  return (
                    <ListItem key={favorite._id}>
                        <h1 id="simple-modal-title">{favorite.strDrink}</h1>
                         <div className="cocktailImage">
                            <img
                                src={favorite.strDrinkThumb}
                                alt={favorite.strDrink}
                                className="drinkImg"
                            /> </div>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Favorites Yet ... Pour It Up!</h3>
            )}
        </div>
    )
}

export default Favorites;