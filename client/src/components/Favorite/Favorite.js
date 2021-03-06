import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import { UserContext } from "../../Providers/UserProvider";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import "./style.css";

function Favorite() {
  const { token } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    loadFavorites();
  }, []);

  function loadFavorites() {
    API.favoriteCocktails(token)
      .then((res) => {
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
      <div
        style={{
          justify: "center",
          //     backgroundColor: "white",
          //     backgroundOpacity: "0.8",
        }}
      >
        <h1 className="container text-center p-2">Favorite Drinks</h1>
        {favorites.length ? (
          <Grid container spacing={2} justifycontent="center" id="favGrid">
            {favorites.map((favorite) => (
              <div className="p-4 m-3 outer" key={favorite._id}>
                <div className="flip-card m-3">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
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
                          className="card-img img-fluid rounded"
                          key={favorite._id}
                        />
                      </div>
                      <h3 className="flip-title-front">{favorite.name}</h3>
                    </div>
                    <div className="flip-card-back p-2">
                      <h4 className="text-center h4">{favorite.name}</h4>
                      <div className="content">
                        <div className="title">
                          Preparation:
                        <span> {favorite.preparation}</span>
                          <br></br>
                        </div>
                        <div className="title">
                          Ingredients:{" "}
                          <span className="data">
                            {" "}
                            {favorite.measurements
                              .map(
                                (measurement, i) =>
                                  measurement + " " + favorite.ingredients[i]
                              )
                              .join(", ")}
                          </span>
                          <br></br>
                        </div>
                        <div className="title">
                          Glass: <span> {favorite.glassware}</span>
                          <br></br>
                        </div>
                        <div className="title">
                          Type: <span> {favorite.type}</span>
                          <br></br>
                        </div>
                      </div>
                      <Button
                        variant="contained"
                        color="default"
                        className="deleteBtn text-center"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteCocktail(favorite._id)}
                      >
                        Delete
                    </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Grid>
        ) : (
          <div className="App justify-content-center flexParent">
            <div className="about homeText text-center">
              <h3>NO FAVORITES SAVED YET!</h3>
              <h5>Click the start button to begin searching for a cocktail!</h5>
              <div className="startBtn col-6 text-center">
                <Button component={Link} to="/search">
                  Begin!
              </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorite;
