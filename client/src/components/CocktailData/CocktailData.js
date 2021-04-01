// import { Modal } from "bootstrap";
import React, { useState } from "react";
import API from "../../utils/API";
import Modal from '@material-ui/core/Modal';

function CocktailData() {
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
    console.log(inputsObj.ingredient);
    API.searchIng(inputsObj.ingredient)
      .then((results) => {
        console.log(results);
        setDrinks(results.data.drinks);
      })
  };

  // Get details on drink selected
  const getDetails = (idDrink) => {
    console.log(inputsObj.ingredient.idDrink);
    API.selectDrink(idDrink)
      .then((results) => {
        console.log(results)
          ;
        console.log(results.data.drinks[0].idDrink);
        setSingleDrinkDetails(results.data.drinks[0].idDrink);
      //  (`Name: ${results.data.drinks[0].strDrink}
      // Preparation: ${results.data.drinks[0].strInstructions}
      // Ingredients: ${results.data.drinks[0].strIngredients}
      // `);
      })
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Alcoholic: ${results.data.drinks[0].strAlcoholic === "Alcoholic" ? "true" : "false"}

  return (
    <div className="App">
      <form onSubmit={searchByIngredientFormSubmit}>
        <input name="ingredient" type="text" onChange={handleInputs} />
        <button className="mx-2 rounded">Search</button>
        {drinks.map((each, index) => {
          return (
            <div key={index} onClick={() => getDetails(each.idDrink)}>
              <button type="button" onClick={handleOpen}>DRINK DETAILS</button>
              <p>{each.strDrink}</p>
              <img src={each.strDrinkThumb} alt={index} />
            </div>
          );
        })}
      </form>
      <Modal
      display="block" 
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
         <div>hello{singleDrinkDetails.strDrink}</div> 
      </Modal>

      <div className="card">
        <div className="card-title">
          <h2>Dranks</h2>
        </div>
        <div className="card-content">

          {/* <p>
        <span className='drink-data'>ingredients: </span>
          {each.strIngredients.map((item, index) => {
        return (
          <span key={index}>{item}</span>
          )
          })}
        </p>
        <p>
        <span className='drink-data'>ingredients: </span>
          {each.strMeasurements.map((measure, index) => {
            return (
              <span key={index}>{measure}</span> 
        )
      })}
        </p> */}
        </div>
      </div>
    </div>
  );
}

export default CocktailData;
