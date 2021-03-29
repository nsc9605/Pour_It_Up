import React, { useState, useEffect } from "react";
import options from "../../utils/API";

function CocktailData() {
  const cocktailData = [];

  const [drinkName, setDrinkName] = useState();
  const [image, setImage] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState();
  const [measurements, setMeasurements] = useState([]);
  // const [category, setCategory] = useState();
  // const [glass, setGlass] = useState();

  useEffect(() => {
    getCocktails();
  }, []);

  function getCocktails() {
    options.search().then((results) => {
      console.log(results);
      const data = {
        name: results.data.drinks.strDrink,
        image: results.data.drinks.strDrinkThumb,
        ingredients: [
          results.data.drinks.strIngredient1,
          results.data.drinks.strIngredient2,
          results.data.drinks.strIngredient3,
          results.data.drinks.strIngredient4,
        ],
        preparation: results.data.drinks.strInstructions,
        measurements: [
          results.data.drinks.strMeasure1,
          results.data.drinks.strMeasure2,
          results.data.drinks.strMeasure3,
        ],
        category: results.data.drinks.strCategory,
        glass: results.data.drinks.strGlass,
      };

      // SET STATES
      setDrinkName(results.data.drinks[0].strDrink);
      setImage(results.data.drinks[0].strDrinkThumb);
      setIngredients([
        results.data.drinks[0].strIngredient1,
        results.data.drinks[0].strIngredient2,
        results.data.drinks[0].strIngredient3,
        results.data.drinks[0].strIngredient4,
      ]);
      setPreparation(results.data.drinks[0].strInstructions);
      setMeasurements([
        results.data.drinks[0].strMeasure1,
        results.data.drinks[0].strMeasure2,
        results.data.drinks[0].strMeasure3,
      ]);
      // setCategory(results.data.drinks[0].strCategory);
      // setGlass(results.data.drinks[0].strGlass);

      cocktailData.push(data);
    });

    return cocktailData;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-condensed">
        <thead className="text-center">
          <tr>
            <th>Name</th>
            <th>Photo</th>
            <th>Preparation</th>
            <th>Ingredient</th>
            <th>Measurements</th>
            {/* <th>Glass</th>
            <th>Category</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{drinkName}</td>
            <td>
              <img className="drinkImg rounded" src={image} alt={drinkName} />
            </td>
            <td>{preparation}</td>
            <td>{ingredients.join(", ").toString()}</td>
            <td>{measurements.join(", ").toString()}</td>
            {/* <td>{glass}</td>
            <td>{category}</td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default CocktailData;

