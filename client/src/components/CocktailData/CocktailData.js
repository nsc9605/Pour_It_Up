import React, { useState, useEffect } from "react";
import options from "../../utils/API";

function CocktailData() {
  const cocktailData = [];

  const [drinkName, setDrinkName] = useState();
  const [image, setImage] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState();
  const [measurements, setMeasurements] = useState([]);
  const [category, setCategory] = useState();
  const [glass, setGlass] = useState();


  useEffect(() => {
    getCocktails();
  },[]);

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
        category: results.data.drinks.setCategory,
        glass: results.data.drinks.strGlass,
      };


      // setDrinkName(results.data.name)
      // setImage(results.data.image)
      setDrinkName(results.data.drinks[0].strDrink);
      setImage(results.data.drinks[0].strDrinkThumb);
      setIngredients([results.data.ingredients]);
      setPreparation(results.data.ingredients)
      setMeasurements([results.data.measurements])
      setCategory(results.data.category)
      setGlass(results.data.glass);

      cocktailData.push(data);
      console.log(cocktailData)
    });

    return cocktailData;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-condensed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Photo</th>
            <th>Ingredient</th>
            <th>Preparation</th>
            <th>Measurements</th>
            <th>Category</th>
            <th>Glass</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{drinkName}</td>
            <td>
              <img className="drinkImg" src={image} alt={drinkName} />
            </td>
            <td>{preparation}</td>
            <td>{measurements}</td>
            <td>{category}</td>
            <td>{ingredients}</td>
            <td>{glass}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default CocktailData;






    //   setDrinkName(results.data.drinks.strDrink);
    //   setImage(results.data.drinks.strDrinkThumb);
    //   setIngredients([ 
    //     results.data.drinks.strIngredient1,
    //     results.data.drinks.strIngredient2,
    //     results.data.drinks.strIngredient3,
    //     results.data.drinks.strIngredient4,
    //     ]);
    //   setPreparation(results.data.drinks.strInstructions);
    //   setMeasurements([
    //     results.data.drinks.strMeasure1,
    //     results.data.drinks.strMeasure2,
    //     results.data.drinks.strMeasure3,
    // ]);
    //   setCategory(results.data.drinks.strCategory);
    //   setGlass(results.data.drinks.strGlass);



    // SAVE FOR LOOP
    //   const data = {
    //     name: results.data.drinks[0].strDrink,
    //     image: results.data.drinks[0].strDrinkThumb,
    //     ingredients: results.data.drinks[0].strIngredient,
    //     preparation: results.data.drinks[0].strInstructions,
    //     measurements: results.data.drinks[0].strMeasurements,
    //     // tags: results.data.drinks[0].strTags,
    //     category: results.data.drinks[0].setCategory,
    //     glass: results.data.drinks[0].strGlass,
    //   };

    //   setDrinkName(results.data.drinks[0].strDrink);
    //   setImage(results.data.drinks[0].strDrinkThumb);
    //   setIngredients(results.data.drink[0].strIngredient);
    //   setPreparation(results.data.drinks[0].strInstructions);
    //   setMeasurements(results.data.drinks[0].strMeasurements);
    // //   setTags(results.data.drinks[0].strTags);
    //   setCategory(results.data.drinks[0].strCategory);
    //   setGlass(results.data.drinks[0].strGlass);
      
