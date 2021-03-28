import React, { useState, useEffect } from 'react';
import options from '../../utils/API';
import Card from 'react-bootstrap/Card';



function CocktailData() {
    const cocktailData = []

    const [drinkName, setDrinkName] = useState()
    const [image, setImage] = useState()

    useEffect(() => {
        getCocktails();
      });
    
      function getCocktails() {
        options.search()
        .then(results => {
            console.log(results)
            const data = {
                
                "name": results.data.drinks[0].strDrink,
                "image": results.data.drinks[0].strDrinkThumb,
                
            }
            setDrinkName(results.data.drinks[0].strDrink)
            setImage(results.data.drinks[0].strDrinkThumb)

            cocktailData.push(data);
            // console.log(cocktailData)
        })
        return(cocktailData);
    }

    return (
        <div>
            <container>
                <h1>Drinks</h1>
                    <img src={image} alt={image} />
                    <p>{drinkName}</p>
               
            </container>
        </div>
    )
    }
export default CocktailData;