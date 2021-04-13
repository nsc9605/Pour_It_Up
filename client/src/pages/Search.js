import React, {  useState } from "react";
import CocktailData from "../components/CocktailData/CocktailData";

function Search() {

  const [mostRecentSearch] = useState(
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
        <div className="flexParent text-center searchText">
          <CocktailData mostRecentSearch={mostRecentSearch} />
        </div>
      </div>
    </div>
  );
}

export default Search;
