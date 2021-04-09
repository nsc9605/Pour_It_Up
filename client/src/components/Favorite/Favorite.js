import React, { useEffect, useState, useContext } from "react";
// import handleSubmitFavorite from "../CocktailData/CocktailData";
//import Jumbotron from "../components/Jumbotron";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import { UserContext } from "../../Providers/UserProvider";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
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

  function deleteCocktail(key) {
    API.deleteCocktail(key)
      .then((res) => {
        console.log("delete response: ", res);
        loadFavorites();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1 className="container">Favorite Drinks</h1>
      {favorites.length ? (
        <Grid container spacing={2}>
          {favorites.map((favorite) => (
            <div className="p-4 m-3">
              <div className="flip-card m-3">
                <div className="flip-card-inner">
                  <div className="flip-card-front" key={favorite._id}>
                    {/* <Button
                    variant="contained"
                    color="default"
                    startIcon={<DeleteIcon />}
                      onClick={() =>
                        console
                          .log(favorite)
                          .then(() => deleteCocktail(favorite._id))
                      }
                    >Delete</Button> */}
                    <div className="card-img-top">
                      <img
                        src={favorite.image}
                        alt={favorite.name}
                        className="card-img image-fluid rounded"
                        key={favorite._id}
                      />
                    </div>
                    {/* <div className="container"> */}
                    <h3>{favorite.name}</h3>
                    <h5>{favorite.glassware}</h5>
                    {/* </div> */}
                  </div>
                  <div className="flip-card-back p-2">
                   
                    <h4 className="text-center">{favorite.name}</h4>
                    <p>
                      Preparation: <span>{favorite.preparation}</span>
                    </p>
                    <p>
                      Measurements:{" "}
                      <span> {favorite.measurements.join(", ")}</span>
                    </p>
                    <p>
                      Ingredients:{" "}
                      <span> {favorite.ingredients.join(", ")}</span>
                    </p>
                    <p>
                      Glass: <span>{favorite.glassware}</span>
                    </p>
                    <Button
                    variant="contained"
                    color="default"
                    className="deleteBtn"
                    startIcon={<DeleteIcon />}
                      onClick={() => deleteCocktail(favorite._id)}
                    >Delete</Button>
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
