import React, { useState, useContext } from "react";
import API from "../../utils/API";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { UserContext } from "../../Providers/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function CocktailData(props) {
  const { token } = useContext(UserContext);
  const [inputsObj, setInputsObj] = useState({});
  const [drinks, setDrinks] = useState([props.mostRecentSearch]);
  const [singleDrinkDetails, setSingleDrinkDetails] = useState({});
  const classes = useStyles();

  // Handle input to target API
  const handleInputs = (e) => {
    let clone = inputsObj;
    inputsObj[e.target.name] = e.target.value;
    setInputsObj(clone);
  };

  // Handle form submit -- first API call
  const searchByIngredientFormSubmit = (e) => {
    e.preventDefault();

    if (inputsObj.ingredient === undefined || inputsObj.ingredient === "") {
      alert("Please enter a valid ingredient!");
      return;
    }
    // console.log(inputsObj.ingredient);
    API.searchIng(inputsObj.ingredient).then((results) => {
      if (results.data.drinks === "None Found") {
        alert("No drinks found with that ingredient!");
        return;
      } else {
        setDrinks(results.data.drinks);
        console.log(results.data.drinks[0]);
        localStorage.setItem(
          "mostRecentSearch",
          JSON.stringify(results.data.drinks[0])
        );
      }
    });
  };

  // Get details on drink selected
  const getDetails = (idDrink) => {
    console.log(inputsObj.ingredient.idDrink);
    API.selectDrink(idDrink).then((results) => {
      // console.log(results);
      console.log(results.data.drinks[0]);
      console.log(results.data.drinks[0].idDrink);
      setSingleDrinkDetails(results.data.drinks[0]);
    });
  };

  // Go through and count the number of ingredients per drink with measure
  const numberOfIngredients = () => {
    let ingredients = [];
    for (let index = 1; index <= 15; index++) {
      ingredients.push(index);
    }
    // setIngredients(ingredients)
    return ingredients;
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [favorite, setFavorite] = React.useState();
  const handleSubmitFavorite = () => {
    toast.info("Saved to favorites!");

    let ingredients = [];

    for (const property in singleDrinkDetails) {
      if (property.includes("strIngredient")) {
        console.log(singleDrinkDetails[property]);
        if (singleDrinkDetails[property]) {
          ingredients.push(singleDrinkDetails[property]);
        }
      }
    }

    let measurements = [];

    for (const property in singleDrinkDetails) {
      if (property.includes("strMeasure")) {
        console.log(singleDrinkDetails[property]);
        if (singleDrinkDetails[property]) {
          measurements.push(singleDrinkDetails[property]);
        }
      }
    }

    const favObject = {
      uid: token,
      idDrink: singleDrinkDetails.idDrink,
      name: singleDrinkDetails.strDrink,
      image: singleDrinkDetails.strDrinkThumb,
      preparation: singleDrinkDetails.strInstructions,
      ingredients: ingredients,
      measurements: measurements,
      glassware: singleDrinkDetails.strGlass,
      type: singleDrinkDetails.strAlcoholic,
    };
    setFavorite(favObject);

    API.saveCocktail(favObject).then((results) => {
      console.log(results);
    });

    return favorite;
  };

  const body = (
    <div id="modal">
      <div className="row p-3">
        <h1 id="simple-modal-title text-center mt-3">
          {singleDrinkDetails.strDrink}
        </h1>
      </div>

      <div className="row">
        <img
          src={singleDrinkDetails.strDrinkThumb}
          alt={singleDrinkDetails.strDrink}
          variant="left"
          className="m-5"
        />

        <div className="cocktail-details px-4">
          <div className="drink-category title">
            Preparation:
            <span> {singleDrinkDetails.strInstructions}</span>
          </div>
          <div className="drink-category title">
            Ingredients:
            {numberOfIngredients().map((number) => (
              <div key={number} className="data">
                {singleDrinkDetails["strMeasure" + number]}
                {singleDrinkDetails["strIngredient" + number]}
              </div>
            ))}
          </div>
          <div className="drink-category title">
            Glass:
            <span> {singleDrinkDetails.strGlass}</span>
          </div>
          <div className="drink-category title">
            Type:
            <span> {singleDrinkDetails.strAlcoholic}</span>
          </div>

          <div className="center">
            <button
              // className="rounded favBtn"
              onClick={() => handleSubmitFavorite()}
            >
              Save to Favorites
            </button>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="container align-center">
      <form className="m-2 text-center" onSubmit={searchByIngredientFormSubmit}>
        <h1>Search for Drinks by Ingredient!</h1>
        <input name="ingredient" type="text" onChange={handleInputs} />
        <button className="m-2 rounded">Search</button>
        {drinks.length === 1 && (
          <>
            <h2>Last drink searched</h2>
          </>
        )}
        <Grid
          container
          direction="row"
          justify="center"
          // alignItems="center"
          // spacing={3}s
          // className={classes.paper}
          className={classes.root}
        >
          <Grid item xs={6}>
            <Grid container justify="space-around">
              {drinks.map((each, index) => {
                return (
                  <Paper
                    className="drinkCards m-2 text-center"
                    key={index}
                    onClick={() => getDetails(each.idDrink)}
                  >
                    <img
                      src={each.strDrinkThumb}
                      alt={index}
                      className="rounded text-center"
                    />
                    <h4 className="text-center">{each.strDrink}</h4>
                    <button
                      className="mb-2 rounded"
                      type="button"
                      onClick={handleOpen}
                    >
                      Select Drink
                    </button>
                  </Paper>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </form>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmitFavorite}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Slide direction="down" in={open} mountOnEnter unmountOnExit>
            <div className="items-center m-5 p-4">{body}</div>
          </Slide>
        </Modal>
      </div>
    </div>
  );
}

export default CocktailData;
