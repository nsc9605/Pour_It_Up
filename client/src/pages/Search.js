import React from 'react';
import CocktailData from '../components/CocktailData/CocktailData';

function Search() {

    return (
        <div>
            <div className="searchPage">
                <div className="flexParent text-center searchText">
                    <CocktailData />
                </div>
            </div>
        </div>
    )
};

export default Search;