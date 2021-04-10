import React from 'react';
import CocktailData from '../components/CocktailData/CocktailData';
// import CocktailList from '../components/CocktailData/CocktailList';
import bg from "../assets/img/bg.jpg";

function Search() {
    return (
        <div>
            <div style={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '100%',
                height: '100vh'
            }}>
                <div className="flexParent h-25">
                    {/* <div className="homeText"> */}
                    <div className="text-center">
                        <CocktailData />
                        {/* <CocktailList /> */}
                    </div>
                </div>

            </div>
        </div>

    )

};

export default Search;