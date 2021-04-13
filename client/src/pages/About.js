import React from "react";
import beach from "../assets/img/beach.jpeg";
import Footer from "../components/Footer";

function About() {
  //   const classes = useStyles();
  return (
    <div className="App justify-content-center">
      <div
        style={{
          backgroundImage: `url(${beach})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed !important",
          width: "100vw",
          height: "100vh",
        }}
      >
        <h1 className="text-center p-2">About Us</h1>
        <div className="flexParent">
          <div className="about m-2">
            <p className="indent">
              Our goal is offer people a convenient source of information
              pertaining to all things cocktails! Based on our observations, it
              seems that a lot of people got into "at-home-bartending" during
              quarantine as the future was uncertain! As people tried to fill
              the void and distract from the uncertainty of when things would go
              back to normal, many people picked up creating cocktails as a
              hobby at home.
            </p>
            <br></br>
            <p className="indent">
              With Pour It Up you are able to type in any ingredient you may
              have just in the house or if you know you like drinks with said
              ingredient, you will be provided with all drinks available. You
              will be provided with the name of the cocktail, an image,
              preparation, ingredients, measurements, and what type of glass it
              should be served in. If you want to save that cocktail to
              reference later you simple click the "Save To Favorites" button..
              This is conveniently linked to your Google account when signed in.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
