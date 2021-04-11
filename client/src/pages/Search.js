import React from 'react';
import CocktailData from '../components/CocktailData/CocktailData';
// import Dialog from '../components/CocktailData/Dialog'
// import CocktailList from '../components/CocktailData/CocktailList';


function Search() {
 
    return (
        <div>
            <div
            className="searchPage"
           >
                <div className="flexParent text-center searchText">
                    {/* <div className="homeText"> */}
                    {/* <div className="text-center"> */}
                        <CocktailData />
                        {/* <Dialog /> */}
                    {/* </div> */}
                </div>

            </div>
        </div>

    )

};

export default Search;