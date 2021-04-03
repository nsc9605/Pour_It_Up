import React, { useState, useContext } from "react";
import API from "../../utils/API";
import Modal from "@material-ui/core/Modal";
import { UserContext } from "../../Providers/UserProvider";
import "./style.css";

function CocktailData() {
  const { user } = useContext(UserContext);
  console.log(user);
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
    if (inputsObj.ingredient === undefined) {
      alert("Please enter a valid ingredient!");
      return;
    }
    console.log(inputsObj.ingredient);
    API.searchIng(inputsObj.ingredient).then((results) => {
      console.log(results);
      setDrinks(results.data.drinks);
    });
  };

  // Get details on drink selected
  const getDetails = (idDrink) => {
    console.log(inputsObj.ingredient.idDrink);
    API.selectDrink(idDrink).then((results) => {
      console.log(results);
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
    const favObject = {
      uid: user.uid,
      name: singleDrinkDetails.strDrink,
      image: singleDrinkDetails.strDrinkThumb,
      ingredients: [singleDrinkDetails.strDrink],
      preparation: singleDrinkDetails.strInstructions,
      measurements: singleDrinkDetails.strMeasure,
      glassware: singleDrinkDetails.strGlass,
    };
    setFavorite(favObject)
    console.log(favObject)
    // return favObject;
  };

  const body = (
    <div id="modal">
      <h1 id="simple-modal-title">{singleDrinkDetails.strDrink}</h1>
      <div className="cocktailImage">
        <img
          src={singleDrinkDetails.strDrinkThumb}
          alt={singleDrinkDetails.strDrink}
          className="drinkImg"
        />
      </div>
      <div className="cocktail-details">
        <h2 className="drink-category">Preparation: </h2>
        <p>{singleDrinkDetails.strInstructions}</p>
        <h2 className="drink-category">Ingredients: </h2>
        {numberOfIngredients().map((number) => (
          <p key={number}>
            {singleDrinkDetails["strMeasure" + number]}
            {singleDrinkDetails["strIngredient" + number]}
          </p>
        ))}
        <h2 className="drink-category">Glass: </h2>
        <p>{singleDrinkDetails.strGlass}</p>
      </div>

      <button  onClick={() => handleSubmitFavorite()}>

        Save to Favorites
      </button>
      {/* <button onClick={() => handleClose()}>
        Close
      </button> */}
    </div>
  );

  return (
    <div className="container">
      <form className="m-2" onSubmit={searchByIngredientFormSubmit}>
      <h2>Search for Drinks by Ingredient!</h2>
        <input name="ingredient" type="text" onChange={handleInputs} />
        <button className="mx-2 rounded">Search</button>
        {drinks.map((each, index) => {
          return (
            <div
              className="container m-4"
              key={index}
              onClick={() => getDetails(each.idDrink)}
            >
              <img
                src={each.strDrinkThumb}
                alt={index}
                className="rounded drinkImg"
              />
              <h4>{each.strDrink}</h4>
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
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmitFavorite}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="m-2" >{body}</div>
      </Modal>
    </div>
  );
}

export default CocktailData;

