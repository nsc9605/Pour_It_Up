import React, { useState, useContext } from "react";
import API from "../../utils/API";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "../../Providers/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function CocktailData() {
  const { token } = useContext(UserContext);
  console.log(token);
  const [inputsObj, setInputsObj] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [singleDrinkDetails, setSingleDrinkDetails] = useState({});
  // const [ingredients, setIngredients] = useState([]);
  // const [measurements, setMeasurements] = useState([]);

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
        alert("No drinks found with that ingredient!")
        return
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
      // console.log(results);
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

  // const useStyles = makeStyles({})

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
    // console.log(favObject);

    API.saveCocktail(favObject).then((results) => {
      console.log(results);
      // setFavorite(favObject);
      // setDrinks(results.data.drinks);
    });
    return favorite;
  };

  const body = (
    <div id="modal">
      {/* <div className="cocktailImage"> */}
      <h1 id="simple-modal-title">{singleDrinkDetails.strDrink}
        <img
          src={singleDrinkDetails.strDrinkThumb}
          alt={singleDrinkDetails.strDrink}
          className="modalImg rounded img-fluid"
        /></h1>
      {/* </div> */}
      <div className="cocktail-details px-4">
        <p className="drink-category">
          Preparation:
          <span>  {singleDrinkDetails.strInstructions}</span>
        </p>
        <p className="drink-category">
          Ingredients: 
        {numberOfIngredients().map((number) => (
          <div key={number}>
             <span>{singleDrinkDetails["strMeasure" + number]}
            {singleDrinkDetails["strIngredient" + number]}</span>
          </div>
        ))}
        </p>
        <p className="drink-category">
          Glass: 
        <span> {singleDrinkDetails.strGlass}</span>
        </p>
      </div>
      <div>
        <button className="rounded" onClick={() => handleSubmitFavorite()}>
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
      {/* <button onClick={() => handleClose()}>
        Close
      </button> */}
    </div>
  );

  return (
    <div className="container">
      <form className="m-2 text-center" onSubmit={searchByIngredientFormSubmit}>
        <h2>Search for Drinks by Ingredient!</h2>
        <input name="ingredient" type="text" onChange={handleInputs} />
        <button className="mx-2 rounded">Search</button>
        {drinks.map((each, index) => {
          return (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <div
                className="drinkCards m-2 text-center"
                key={index}
                onClick={() => getDetails(each.idDrink)}
              >
                <img
                  src={each.strDrinkThumb}
                  alt={index}
                  className="rounded drinkImg"
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
            </Grid>
          );
        })}
      </form>
      <Grid container spacing={4}>
        <Modal
          open={open}
          onClose={handleClose}s
          onSubmit={handleSubmitFavorite}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          id="container-fluid"
        >
          <div className="m-2">{body}</div>
        </Modal>
      </Grid>
    </div>
  );
}

export default CocktailData;
