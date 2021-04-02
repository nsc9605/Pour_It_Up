import React, { useState } from "react";
import API from "../../utils/API";
import Modal from "@material-ui/core/Modal";
// import Cocktail from "./Cocktail";

function CocktailList() {
  const [inputsObj, setInputsObj] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [singleDrinkDetails, setSingleDrinkDetails] = useState({});
  // const [newDrinkDetails, setNewDrinkDetails] = useState({});

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
    // console.log(inputsObj.ingredient.idDrink);
    API.selectDrink(idDrink).then((results) => {
      console.log(results);
      console.log(results.data.drinks[0].idDrink);
      setSingleDrinkDetails(results.data.drinks[0].idDrink);
    //  let setSingleDrinkDetails = {
    //     idDrink: results.data.drinks[0].idDrink,
    //     name: results.data.drinks[0].strDrink,
    //     image: results.data.drinks[0].strDrinkThumb,
    //     preparations: results.data.drinks[0].strInstructions,
    //     ingredients: results.data.drinks[0].strIngredient,
    //     measurements: results.data.drinks[0].strMeasure,
    //     glass: results.data.drinks[0].strGlass
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
  <div>
    {singleDrinkDetails}
  </div>
)

  // Alcoholic: ${results.data.drinks[0].strAlcoholic === "Alcoholic" ? "true" : "false"}

  return (
    <div className="cocktailList">
      <form onSubmit={searchByIngredientFormSubmit}>
        <input name="ingredient" type="text" onChange={handleInputs} />
        <button className="mx-2 rounded">Search</button>
        {drinks.map((each, index) => {
          return (
            <div
              className="cocktailList"
              key={index}
              onClick={() => getDetails(each.idDrink)}
            >
              <p>{each.strDrink}</p>
              <img className="drinkImg" src={each.strDrinkThumb} alt={index} />
              <button type="button" onClick={handleOpen}>
                DRINK DETAILS
              </button>
              {/* <Cocktail {...drinks}/> */}
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
        {body}
      </Modal>
    </div>
  );
}

export default CocktailList;

// {
//   /* <div className="card">
//         <div className="card-title">
//           <h2>Dranks</h2>
//         </div>
//         <div className="card-content">
//           <h2>{each.strDrink}</h2> */
// }
// {
//   /* <p>
//       <span className='drink-data'>ingredients: </span>
//         {each.strIngredients.map((item, index) => {
//       return (
//         <span key={index}>{item}</span>
//         )
//         })}
//       </p>
//       <p>
//       <span className='drink-data'>ingredients: </span>
//         {each.strMeasurements.map((measure, index) => {
//           return (
//             <span key={index}>{measure}</span> 
//       )
//     })}
//       </p> */
// }
