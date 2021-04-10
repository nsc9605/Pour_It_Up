import React from 'react';
import CocktailData from '../components/CocktailData/CocktailData';
// import CocktailList from '../components/CocktailData/CocktailList';
import bg from "../assets/img/search2.jpeg";

function Search() {
    // const styles = {
    //     container: {
    //         backgroundImage: `url(${bg})`,
    //         backgroundPosition: 'center',
    //         backgroundSize: 'cover',
    //         backgroundRepeat: 'no-repeat',
    //         width: '100vw',
    //         height: '100vh'
    //     }
    // };
    return (
        <div>
            <div
            className="searchPage"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                width: '100vw',
                height: '100vh',
            }}>
            {/* > */}
                <div className="flexParent text-center searchText">
                    {/* <div className="homeText"> */}
                    {/* <div className="text-center"> */}
                        <CocktailData />
                    {/* </div> */}
                </div>

            </div>
        </div>

    )

};

export default Search;