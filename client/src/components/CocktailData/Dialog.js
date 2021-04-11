import React, { useState, useContext } from "react";
import API from "../../utils/API";
import { UserContext } from "../../Providers/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons components
import Clear from "@material-ui/icons/Clear";
// core components
import componentStyles from "assets/theme/components/dialog.js";
import "./style.css";

const useStyles = makeStyles(componentStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Example() {
  const classes = useStyles();
  const { token } = useContext(UserContext);
  const [inputsObj, setInputsObj] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [singleDrinkDetails, setSingleDrinkDetails] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleInputs = (e) => {
    let clone = inputsObj;
    inputsObj[e.target.name] = e.target.value;
    setInputsObj(clone);
  };

  // Handle form submit -- first API call
  const searchByIngredientFormSubmit = (e) => {
    e.preventDefault();

    if (inputsObj.ingredient === undefined || inputsObj.ingredient === "") {
      alert("Please enter a valid ingredient!");
      return;
    }
    // console.log(inputsObj.ingredient);
    API.searchIng(inputsObj.ingredient).then((results) => {
      console.log(results);
      if (results.data.drinks === "None Found") {
        alert("No drinks found with that ingredient!");
        return;
      } else {
        setDrinks(results.data.drinks);
        console.log(results.data.drinks);
      }
    });
  };

  // Get details on drink selected
  const getDetails = (idDrink) => {
    console.log(inputsObj.ingredient.idDrink);
    API.selectDrink(idDrink).then((results) => {
      // console.log(results);
      console.log(results.data.drinks[0].idDrink);
      setSingleDrinkDetails(results.data.drinks[0]);
    });
  };

  // Go through and count the number of ingredients per drink with measure
  const numberOfIngredients = () => {
    let ingredients = [];
    for (let index = 1; index <= 15; index++) {
      ingredients.push(index);
    }
    // setIngredients(ingredients)
    return ingredients;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [favorite, setFavorite] = React.useState();
  const handleSubmitFavorite = () => {
    toast.info("Saved to favorites!");

    let ingredients = [];

    for (const property in singleDrinkDetails) {
      if (property.includes("strIngredient")) {
        console.log(singleDrinkDetails[property]);
        if (singleDrinkDetails[property]) {
          ingredients.push(singleDrinkDetails[property]);
        }
      }
    }

    let measurements = [];

    for (const property in singleDrinkDetails) {
      if (property.includes("strMeasure")) {
        console.log(singleDrinkDetails[property]);
        if (singleDrinkDetails[property]) {
          measurements.push(singleDrinkDetails[property]);
        }
      }
    }

    const favObject = {
      uid: token,
      idDrink: singleDrinkDetails.idDrink,
      name: singleDrinkDetails.strDrink,
      image: singleDrinkDetails.strDrinkThumb,
      preparation: singleDrinkDetails.strInstructions,
      ingredients: ingredients,
      measurements: measurements,
      glassware: singleDrinkDetails.strGlass,
    };
    setFavorite(favObject);
    // console.log(favObject);

    API.saveCocktail(favObject).then((results) => {
      console.log(results);
      // setFavorite(favObject);
      // setDrinks(results.data.drinks);
    });
    return favorite;
  };

  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      alignSelf: 'center'
    },
}));
// const classes = useStyles();
  
  return (
    <div className="container align-center">
      <form className="m-2 text-center" onSubmit={searchByIngredientFormSubmit}>
        <h1>Search for Drinks by Ingredient!</h1>
        <input name="ingredient" type="text" onChange={handleInputs} />
        <button className="m-2 rounded">Search</button>
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        className={classes.root}
        >
        {drinks.map((each, index) => {
          return (
              <>
              <div
                className="drinkCards m-2 text-center"
                key={index}
                onClick={() => getDetails(each.idDrink)}
              >
                <img
                  src={each.strDrinkThumb}
                  alt={index}
                  className="rounded drinkImg img-fluid text-center"
                />
                <h4 className="text-center">{each.strDrink}</h4>
                <button
                  className="mb-2 rounded"
                  type="button"
                  onClick={handleOpen}
                >
                  Select Drink
                </button>
              </div>
               <Dialog
               open={open}
               TransitionComponent={Transition}
               keepMounted
               onClose={handleClose}
               aria-labelledby="alert-dialog-slide-title"
               aria-describedby="alert-dialog-slide-description"
             >
               <div className={classes.dialogHeader}>
                 <Typography
                   variant="h5"
                   component="h5"
                   className={classes.dialogTitle}
                 >
                   {singleDrinkDetails.strDrink}
                 </Typography>
                 <img
                   src={singleDrinkDetails.strDrinkThumb}
                   alt={singleDrinkDetails.strDrink}
                   className="rounded img-fluid text-center"
                 />
                 <IconButton onClick={handleClose}>
                   <Clear />
                 </IconButton>
               </div>
               <DialogContent>
                 <Typography variant="body2" component="p">
                   Preparation:
                   <span> {singleDrinkDetails.strInstructions}</span>
                 </Typography>
                 <Typography variant="body2" component="p">
                   Ingredients:
                   {numberOfIngredients().map((number) => (
                     <div key={number} className="data">
                       {singleDrinkDetails["strMeasure" + number]}
                       {singleDrinkDetails["strIngredient" + number]}
                     </div>
                   ))}
                 </Typography>
                 <Typography variant="body2" component="p">
                 Glass: 
               <span> {singleDrinkDetails.strGlass}</span>
                 </Typography>
               </DialogContent>
               <DialogActions>
                 <Button onClick={() => handleSubmitFavorite()} color="primary" variant="contained">
                   Save To Favorites
                 </Button>
                 <ToastContainer
                 position="top-right"
                 autoClose={2000}
                 hideProgressBar={false}
                 newestOnTop={false}
                 closeOnClick
                 rtl={false}
                 pauseOnFocusLoss
                 draggable
                 pauseOnHover
               />
                 <Button
                   component={Box}
                   onClick={handleClose}
                   color="primary"
                   marginLeft="auto!important"
                 >
                   Close
                 </Button>
               </DialogActions>
             </Dialog>
             </>
          );
        })}
        </Grid>
      </form>
      </div>
  );
}

