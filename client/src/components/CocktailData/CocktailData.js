import React, { useState, useEffect } from 'react';
import options from '../../utils/API';



function CocktailData() {

    const cocktailData = []

    // const []

    useEffect(() => {
        getCocktails();
      });
    
      function getCocktails() {
        options.search()
        .then(results => {

            const data = {

            }
            // set(results)
            cocktailData.push(data);
        })
        return(cocktailData);
    }

    return (
        <div>

        </div>
    )
    }
export default CocktailData;