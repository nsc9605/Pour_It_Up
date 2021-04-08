import React, { useEffect, useState, useContext } from "react";
// import handleSubmitFavorite from "../CocktailData/CocktailData";
//import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import API from "../../utils/API";
import { UserContext } from "../../Providers/UserProvider";
import Grid from "@material-ui/core/Grid";
import "./style.css";

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
        setFavorites(res.data);
      })
      .catch((err) => console.log(err));
  }

  function deleteCocktail(_id) {
    API.deleteCocktail(_id).then((res) => {
      loadFavorites();
    });
  }

  return (
    <div>
      <h1 className="container">Favorite Drinks</h1>
      {favorites.length ? (
        <Grid container spacing={2}>
          {favorites.map((favorite) => (
        <div className="card p-4 m-3">
          <div className="flip-card m-5">
            <div className="flip-card-inner">
              <div className="flip-card-front" key={favorite._id}>
                <img
                  src={favorite.image}
                  alt={favorite.name}
                  className="card-img image-fluid"
                  key={favorite._id}
                />
                {/* <div className="container"> */}
                <h3>{favorite.name}</h3>
                <h5>{favorite.glassware}</h5>
                <DeleteBtn onClick={() => deleteCocktail(favorite._id)} />
                {/* </div> */}
              </div>
              <div className="flip-card-back p-2">
                <h2>{favorite.name}</h2>
                <p>Preparation: <span>{favorite.preparation}</span></p>
                <p>Glass: <span>{favorite.glassware}</span></p>
                <p>Measurements: <span>{favorite.measurements}</span></p>
              </div>
              </div>
              </div>
              </div>
              ))}
                </Grid>
              ) : (
                <h3>No Favorites Yet ... Pour It Up!</h3>
                )}
                </div>
        );
}

export default Favorite;
