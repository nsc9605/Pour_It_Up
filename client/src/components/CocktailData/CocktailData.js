import React, { useState, useContext } from "react";
import API from "../../utils/API";
// import Modal from "@material-ui/core/Modal";
// import { Modal } from '@material-ui/core'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { UserContext } from "../../Providers/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";
import Scroll from "../ScrollBtn/index";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: "end",
    textContent: "center",
    alignContent: "center",
  },

  main: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "24px",
    wrap: "wrap",
    alignContent: "space-around",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 700,
    minWidth: 400,
    padding: theme.spacing(3),
  },
  media: {
    height: "100%",
    margin: "10px",
    paddingTop: "82%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  popup: {
    justifyContent: "center",
  },
}));

function CocktailData(props) {
  const { token } = useContext(UserContext);
  const [inputsObj, setInputsObj] = useState({});
  const [drinks, setDrinks] = useState([props.mostRecentSearch]);
  const [singleDrinkDetails, setSingleDrinkDetails] = useState({});
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  // const [showScroll, setShowScroll] = useState();

  // Handle input to target API
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
      if (results.data.drinks === "None Found") {
        alert("No drinks found with that ingredient!");
        return;
      } else {
        setDrinks(results.data.drinks);
        console.log(results.data.drinks[0]);
        localStorage.setItem(
          "mostRecentSearch",
          JSON.stringify(results.data.drinks[0])
        );
      }
    });
  };

  // Get details on drink selected
  const getDetails = (idDrink) => {
    console.log(inputsObj.ingredient.idDrink);
    API.selectDrink(idDrink).then((results) => {
      // console.log(results);
      console.log(results.data.drinks[0]);
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
      type: singleDrinkDetails.strAlcoholic,
    };
    setFavorite(favObject);

    API.saveCocktail(favObject).then((results) => {
      console.log(results);
    });
    setTimeout(handleClose, 2000);
    return favorite;
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        spacing={3}
        alignItems="center"
        className={classes.root}
      >
        <form
          className="m-2 text-center"
          onSubmit={searchByIngredientFormSubmit}
        >
          <h1>Search for Drinks by Ingredient!</h1>
          <input name="ingredient" type="text" onChange={handleInputs} />
          <button className="m-2 rounded">Search</button>
          {drinks.length === 1 && (
            <>
              <h2>Last drink searched:</h2>
            </>
          )}

          <div
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmitFavorite}
            className={classes.popup}
          >
            <Slide direction="down" in={open} mountOnEnter unmountOnExit>
              <Card className={classes.card} fontFamily="Thasadith">
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="drink"
                      className={classes.avatar}
                      src={singleDrinkDetails.strDrinkThumb}
                    >
                      {singleDrinkDetails.strDrinkThumb}
                    </Avatar>
                  }
                >
                  {singleDrinkDetails.strDrink}
                </CardHeader>
                <CardMedia
                  className={classes.media}
                  id="simple-modal-title"
                  image={singleDrinkDetails.strDrinkThumb}
                  title={singleDrinkDetails.strDrink}
                />
                <CardContent>
                  <Typography variant="h5" component="h5" color="textSecondary">
                    {singleDrinkDetails.strDrink}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    component="h4"
                    
                  >
                    {singleDrinkDetails.strAlcoholic}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => handleSubmitFavorite()}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="exit" onClick={() => handleClose()}>
                    <CloseIcon />
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent align="left">
                    <Typography gutterbottom variant="h5" component="h6">
                      Ingredients:
                    </Typography>
                    {numberOfIngredients().map((number) => (
                      <Typography
                        key={number}
                        className="data"
                        variant="body2"
                        component="p"
                      >
                        {singleDrinkDetails["strMeasure" + number]}
                        {singleDrinkDetails["strIngredient" + number]}
                      </Typography>
                    ))}
                    <Typography gutterBottom variant="h5" component="h6">
                      Preparation:
                    </Typography>
                    <Typography variant="body2" component="p">
                      {singleDrinkDetails.strInstructions}
                    </Typography>
                    <Typography gutterbottom variant="h5" component="h6">
                      Glass:
                    </Typography>
                    <Typography variant="body2" component="p">
                      {singleDrinkDetails.strGlass}
                    </Typography>
                    <Typography gutterbottom variant="h5" component="h6">
                      Type:
                    </Typography>
                    <Typography>{singleDrinkDetails.strAlcoholic}</Typography>
                  </CardContent>
                </Collapse>
                <ToastContainer
                  position="top-right"
                  autoClose={1700}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </Card>
            </Slide>
          </div>
          <Grid item xs={8} className={classes.main}>
            {/* <Grid
              container
              justify="space-around"
              alignItems="center"
              className={classes.main}
            > */}
              {drinks.map((each, index) => {
                return (
                  <Paper
                    className="drinkCards m-2 text-center"
                    key={index}
                    onClick={() => getDetails(each.idDrink)}
                  >
                    <img
                      src={each.strDrinkThumb}
                      alt={index}
                      className="rounded text-center"
                    />
                    <h4 className="text-center">{each.strDrink}</h4>
                    <button
                      className="mb-2 rounded"
                      type="button"
                      onClick={handleOpen}
                    >
                      Select Drink
                    </button>
                  </Paper>
                );
              })}
            </Grid>
          {/* </Grid> */}
          {/* </Grid> */}
        </form>
        <Scroll />
      </Grid>
    </>
  );
}

export default CocktailData;
