import React, {  useState } from "react";
import CocktailData from "../components/CocktailData/CocktailData";
import Footer from "../components/Footer";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";

function Search() {
const [mostRecentSearch] = useState(
  // const [recentDrink] = useState(
    { ...JSON.parse(localStorage.getItem("mostRecentSearch")) }
      ? { ...JSON.parse(localStorage.getItem("mostRecentSearch")) }
      : {
          strDrink: "155 Belmont",
          strDrinkThumb:
            "https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg",
          idDrink: "15346",
        }
  );

 
  return (
    <div>
      <div className="searchPage">
        <div className="flexParent text-center">
          <CocktailData mostRecentSearch={mostRecentSearch}>
                  {/* <Paper
                    className="drinkCards m-2 text-center"
        
                  >
                    <img
                      src={recentDrink.strDrinkThumb}
                      alt={recentDrink.idDrink}
                      className="rounded text-center"
                    />
                    <h4 className="text-center">{recentDrink.strDrinkThumb}</h4>
                  </Paper>
                ); */}
            
          
             </CocktailData>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
