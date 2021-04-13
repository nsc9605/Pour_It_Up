import React, {  useState } from "react";
import CocktailData from "../components/CocktailData/CocktailData";
import Footer from "../components/Footer";

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

  // useEffect(() => {
  //   if (localStorage.getItem("mostRecentSearch")) {
  //     setMostRecentSearch({
  //       ...JSON.parse(localStorage.getItem("mostRecentSearch")),
  //     });
  //   }
  //   console.log(mostRecentSearch);
  // }, []);

  return (
    <div>
      <div className="searchPage">
        <div className="flexParent text-center searchText">
          <CocktailData mostRecentSearch={mostRecentSearch} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
