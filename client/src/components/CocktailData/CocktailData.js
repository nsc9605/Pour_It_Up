// import { Modal } from "bootstrap";
import React, { useState } from "react";
import API from "../../utils/API";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function CocktailData() {
  const [inputsObj, setInputsObj] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [singleDrinkDetails, setSingleDrinkDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  // Handle input to target API
  const handleInputs = (e) => {
    let clone = inputsObj;
    inputsObj[e.target.name] = e.target.value;
    setInputsObj(clone);
  };

  // Handle form submit -- first API call
  const searchByIngredientFormSubmit = (e) => {
    e.preventDefault();
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

      // Ingredients Array
      let ingredients = [
        results.data.drinks[0].strIngredient1,
        results.data.drinks[0].strIngredient2,
        results.data.drinks[0].strIngredient3,
        results.data.drinks[0].strIngredient4,
      ];
      setIngredients(ingredients);

      // Measurements Array
      let measurements = [
        results.data.drinks[0].strMeasure1,
        results.data.drinks[0].strMeasure2,
        results.data.drinks[0].strMeasure3,
        results.data.drinks[0].strMeasure4,
      ]
      setMeasurements(measurements)
    });
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="container">
      <h1 id="simple-modal-title modalTest">{singleDrinkDetails.strDrink}</h1>
      <div className="cocktailImage">
        <img
          src={singleDrinkDetails.strDrinkThumb}
          alt={singleDrinkDetails.strDrink}
          className="drinkImg"
        />
      </div>
      <div className="cocktail-details">
        <p>
          <span className="drink-category">Preparation: </span>
          {singleDrinkDetails.strInstructions}
        </p>
        <p>
          <span className="drink-category">Ingredients: </span>
          {ingredients} 
        </p>
        <p>
          <span className="drink-category">Measurement: </span>
          {measurements}
        </p>
        <p>
          <span className="drink-category">Glass: </span>
          {singleDrinkDetails.strGlass}
        </p>
      </div>
    </div>
  );

  return (
    <div className="container">
      <form onSubmit={searchByIngredientFormSubmit}>
        <input name="ingredient" type="text" onChange={handleInputs} />
        <button className="mx-2 rounded">Search</button>
        {drinks.map((each, index) => {
          return (
            <div key={index} onClick={() => getDetails(each.idDrink)}>
              <button type="button" onClick={handleOpen}>
                DRINK DETAILS
              </button>
              <p>{each.strDrink}</p>
              <img src={each.strDrinkThumb} alt={index} />
            </div>
          );
        })}
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal">{body}</div>
      </Modal>
    </div>
  );
}

export default CocktailData;
