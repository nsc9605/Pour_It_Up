import React from 'react';
import bg from "../assets/img/bg.jpg";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Footer from "../components/Footer";

function Home() {
    return (
        <div>
            <div style={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '100%',
                height: '100vh'
            }}>
                <div className="flexParent">
                    <div className="homeText col-6 text-center">
                        <h1>Welcome to Pour It Up!</h1>
                        <h2>The source for all of your Cocktail needs!</h2>
                        <p>Search an ingredient to find cocktail information!</p>
                        <div className="startBtn col-6 text-center">
                            <Button component={Link} to="/search">
                                Click to Start!
                        </Button>
                        </div>

                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
};

export default Home;