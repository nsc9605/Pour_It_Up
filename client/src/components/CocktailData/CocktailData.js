import React, { useState, useContext } from "react";
import API from "../../utils/API";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "../../Providers/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";


function CocktailData() {
  const { token } = useContext(UserContext);
  const [inputsObj, setInputsObj] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [singleDrinkDetails, setSingleDrinkDetails] = useState({});

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
      console.log(results);
      if (results.data.drinks === "None Found") {
        alert("No drinks found with that ingredient!");
        return;
      } else {
        setDrinks(results.data.drinks);
        console.log(results.data.drinks);
      }
    });
  };

  // Get details on drink selected
  const getDetails = (idDrink) => {
    console.log(inputsObj.ingredient.idDrink);
    API.selectDrink(idDrink).then((results) => {
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
        <h1 id="simple-modal-title text-center p-3">
          {singleDrinkDetails.strDrink}
        </h1>
      </div>

      <div className="row">
        <img
          src={singleDrinkDetails.strDrinkThumb}
          alt={singleDrinkDetails.strDrink}
          variant="left"
          className="rounded drinkImg img-fluid align-center"
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

          <div className="center">
            <button
              className="rounded favBtn"
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
        {/* <button onClick={() => handleClose()}>
        Close
      </button> */}
      </div>
    </div>
  );

  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      alignSelf: "center",
    },
  }));

  const classes = useStyles();

  return (
    <div className="container align-center">
      <form className="m-2 text-center" onSubmit={searchByIngredientFormSubmit}>
        <h1>Search for Drinks by Ingredient!</h1>
        <input name="ingredient" type="text" onChange={handleInputs} />
        <button className="m-2 rounded">Search</button>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          className={classes.root}
        >
          {drinks.map((each, index) => {
            return (
              <div
                className="drinkCards m-2 text-center"
                key={index}
                onClick={() => getDetails(each.idDrink)}
              >
                <img
                  src={each.strDrinkThumb}
                  alt={index}
                  className="rounded drinkImg img-fluid text-center"
                />
                <h4 className="text-center">{each.strDrink}</h4>
                <button
                  className="mb-2 rounded"
                  type="button"
                  onClick={handleOpen}
                >
                  Select Drink
                </button>
              </div>
            );
          })}
        </Grid>
      </form>
      <Grid container spacing={4} className={classes.root} justify="center">
        <Modal
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmitFavorite}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        // className="modal-size"
        >
          <div className="items-center m-4">{body}</div>
        </Modal>
      </Grid>
    </div>
  );
}

export default CocktailData;