import React, { useState } from "react";
// import { ingredientSearch, details } from "../../utils/API";

function Demo() {
  const [inputsObj, setInputsObj] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [singleDrinkDetails, setSingleDrinkDetails] = useState({});

  const handleInputs = (e) => {
    let clone = inputsObj;
    inputsObj[e.target.name] = e.target.value;
    setInputsObj(clone);
  };

  const searchByIngredientFormSubmit = async (e) => {
    e.preventDefault();
    console.log(inputsObj.ingredient);
    var response = await fetch(`https://the-cocktail-db.p.rapidapi.com/filter.php?i=${inputsObj.ingredient}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": process.env.API_HOST,
      },
    });
    var data = await response.json();
    setDrinks(data.drinks);
  };

  const getDetails = async (idDrink) => {
    console.log(inputsObj.ingredient);
    var response = await fetch(`https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${idDrink}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": process.env.API_HOST,
      },
    });

    var data = await response.json();
    console.log(data.drinks[0]);
    alert(`Name: ${data.drinks[0].strDrink}
Alcoholic: ${data.drinks[0].strAlcoholic === "Alcoholic" ? "true" : "false"}`);
    setSingleDrinkDetails(data.drinks[0]);
  };
  return (
    <div className="App">
      <form onSubmit={searchByIngredientFormSubmit}>
        <input name="ingredient" type="text" onChange={handleInputs} />
        <button>Search</button>
        {drinks.map((each, index) => {
          return (
            <div key={index} onClick={() => getDetails(each.idDrink)}>
              <p>{each.strDrink}</p>
              <img src={each.strDrinkThumb} alt={index} />
              <p>{each.strInstructions}</p>
              {/* <p>
              <span className='drink-data'>ingredients: </span>
                {each.ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null;
            })}
              </p>
              <p>
              <span className='drink-data'>ingredients: </span>
                {each.measurements.map((measure, index) => {
              return measure ? <span key={index}>{measure}</span> : null;
            })}
              </p> */}
            </div>
          );
        })}
      </form>
    </div>
  );
}
export default Demo;
