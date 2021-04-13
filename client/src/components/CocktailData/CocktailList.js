// import React, { useState, useContext } from 'react';
// import API from "../../utils/API";
// import Modal from "@material-ui/core/Modal";
// import { UserContext } from "../../Providers/UserProvider";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { makeStyles } from '@material-ui/core/styles';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
// // import tileData from './tileData';
// import "./style.css";



// function CocktailList() {
//     const useStyles = makeStyles((theme) => ({
//         root: {
//           display: 'flex',
//           flexWrap: 'wrap',
//           justifyContent: 'space-around',
//           overflow: 'hidden',
//           // backgroundColor: theme.palette.background.paper,
//         },
//         gridList: {
//           width: 500,
//           height: 450,
//         },
//         icon: {
//           color: 'rgba(255, 255, 255, 0.54)',
//         },
//       }));

// const { user } = useContext(UserContext);
//   console.log(user);
//   const [inputsObj, setInputsObj] = useState({});
//   const [drinks, setDrinks] = useState([]);
//   const [singleDrinkDetails, setSingleDrinkDetails] = useState({});
//   // const [ingredients, setIngredients] = useState([]);
//   // const [measurements, setMeasurements] = useState([]);

//   // Handle input to target API
//   const handleInputs = (e) => {
//     let clone = inputsObj;
//     inputsObj[e.target.name] = e.target.value;
//     setInputsObj(clone);
//   };

//   // Handle form submit -- first API call
//   const searchByIngredientFormSubmit = (e) => {
//     e.preventDefault();

//     if (inputsObj.ingredient === undefined) {
//       alert("Please enter a valid ingredient!");
//       return;
//     }
//     // console.log(inputsObj.ingredient);
//     API.searchIng(inputsObj.ingredient).then((results) => {
//       console.log(results);
//       setDrinks(results.data.drinks);
//       console.log(results.data.drinks)
//     });
//   };

//   // Get details on drink selected
//   const getDetails = (idDrink) => {
//     console.log(inputsObj.ingredient.idDrink);
//     API.selectDrink(idDrink).then((results) => {
//       // console.log(results);
//       console.log(results.data.drinks[0].idDrink);
//       setSingleDrinkDetails(results.data.drinks[0]);
//     });
//   };


//   // Go through and count the number of ingredients per drink with measure
//   const numberOfIngredients = () => {
//     let ingredients = [];
//     for (let index = 1; index <= 15; index++) {
//       ingredients.push(index);
//     }
//     // setIngredients(ingredients)
//     return ingredients;
//   };

//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   // const useStyles = makeStyles({})

//   const [favorite, setFavorite] = React.useState();
//   const handleSubmitFavorite = () => {
//     toast.info("Saved to favorites!");

//     let ingredients = [];

//     for (const property in singleDrinkDetails) {
//       if(property.includes("strIngredient")){
//         console.log(singleDrinkDetails[property]);
//         if(singleDrinkDetails[property]){
//           ingredients.push(singleDrinkDetails[property]);
//         }
//       }
//     }

// let measurements = [];

//     for (const property in singleDrinkDetails) {
//       if(property.includes("strMeasure")){
//         console.log(singleDrinkDetails[property]);
//         if(singleDrinkDetails[property]){
//           measurements.push(singleDrinkDetails[property]);
//         }
//       }
//     }
    
//     const favObject = {
//       uid: user.uid,
//       idDrink: singleDrinkDetails.idDrink,
//       name: singleDrinkDetails.strDrink,
//       image: singleDrinkDetails.strDrinkThumb,
//       preparation: singleDrinkDetails.strInstructions,
//       ingredients: ingredients,
//       measurements: measurements,
//       glassware: singleDrinkDetails.strGlass,
//     };
//     setFavorite(favObject);
//     // console.log(favObject);

//     API.saveCocktail(favObject).then((results) => {
//       console.log(results);
//       // setFavorite(favObject);
//       // setDrinks(results.data.drinks);
//     });
//     return favorite;
//   };

//   const body = (
//     <div id="modal">
//       <h1 id="simple-modal-title">{singleDrinkDetails.strDrink}</h1>
//       <div className="cocktailImage">
//         <img
//           src={singleDrinkDetails.strDrinkThumb}
//           alt={singleDrinkDetails.strDrink}
//           className="drinkImg rounded"
//         />
//       </div>
//       <div className="cocktail-details px-4">
//         <h2 className="drink-category">Preparation: </h2>
//         <p>{singleDrinkDetails.strInstructions}</p>
//         <h2 className="drink-category">Ingredients: </h2>
//         {numberOfIngredients().map((number) => (
//           <p key={number}>
//             {singleDrinkDetails["strMeasure" + number]}
//             {singleDrinkDetails["strIngredient" + number]}
//           </p>
//         ))}
//         <h2 className="drink-category">Glass: </h2>
//         <p>{singleDrinkDetails.strGlass}</p>
//       </div>
//       <div>
//         <button onClick={() => handleSubmitFavorite()}>Save to Favorites</button>
//         <ToastContainer
//           position="top-right"
//           autoClose={2000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//       </div>
//       {/* <button onClick={() => handleClose()}>
//         Close
//       </button> */}
//     </div>
//   );


//   const classes = useStyles();

//   return (
//     <div className="container">
//     <form className="m-2" onSubmit={searchByIngredientFormSubmit}>
//       <h2>Search for Drinks by Ingredient!</h2>
//       <input name="ingredient" type="text" onChange={handleInputs} />
//       <button className="mx-2 rounded">Search</button>
//     <div className={classes.root}>
//       <GridList cellHeight={180} className={classes.gridList}>
//         <GridListTile key="Subheader" cols={2} style={{ height: '500px', width: "500px" }}>
//           <ListSubheader component="div">Cocktails</ListSubheader>
//         </GridListTile>
//         {drinks.map((each, index) => {
//             return(
//              <div
//              className="drinkCards m-2"
//              key={index}
//              onClick={() => getDetails(each.idDrink)}
//            >
//           <GridListTile key={each.strDrinkThumb}>
//             <img src={each.strDrink} alt={each.strDrink} className="drinkImg rounded"/>
//             <GridListTileBar
//               title={each.strDrink}
//               subtitle={<span>by: {each.strGlass}</span>}
//               actionIcon={
//                 <IconButton aria-label={`info about ${each.strDrink}`}  onClick={handleOpen}>
//                   <InfoIcon /> Select
//                 </IconButton>
//               }
//             />
//           </GridListTile>
//         </div>
//         )
//     })}
//         </GridList>
//         </div>
        
//         </form>
//         <Modal
//         open={open}
//         onClose={handleClose}
//         onSubmit={handleSubmitFavorite}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         <div className="m-2">{body}</div>
//       </Modal>
//         </div>
//         );
// }

// export default CocktailList;


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// }));

// export default function RecipeReviewCard() {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Card 
//     open={open}
//       onClose={handleClose}
//       onSubmit={handleSubmitFavorite}
//       className={classes.root}>
//       <CardHeader>
//           {singleDrinkDetails.strDrink}
//           </CardHeader>
//       <CardMedia
//         className={classes.media}
//         image={singleDrinkDetails.strDrinkThumb}
//         title={singleDrinkDetails.strDrink}
//       />
//       <CardContent>
//         <Typography variant="body2" color="textSecondary" component="p">
//         Ingredients:
//          {numberOfIngredients().map((number) => (
//           <span key={number} classNameName="data">
//             {singleDrinkDetails["strMeasure" + number]}
//             {singleDrinkDetails["strIngredient" + number]}
//           </span>
//         ))}
//         </Typography>
//         <Typography variant="body2" color="textSecondary" component="p">
//           Preparation:
//           <span> {singleDrinkDetails.strInstructions} </span>
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//           Glass:
//           <span> {singleDrinkDetails.strGlass}</span>
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//           Type:
//           <span> {singleDrinkDetails.strAlcoholic}</span>
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon 
//            onClick={() => handleSubmitFavorite()} />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <IconButton
//           className={clsx(classes.expand, {
//             [classes.expandOpen]: expanded,
//           })}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </IconButton>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography paragraph>Ingredients:</Typography>
//           {numberOfIngredients().map((number) => (
//           <Typography paragraph key={number} classNameName="data">
//             {singleDrinkDetails["strMeasure" + number]}
//             {singleDrinkDetails["strIngredient" + number]}
//           </Typography>
//             ))}
//             <Typography paragraph>Preparation:</Typography>
//           <Typography paragraph>
//             {singleDrinkDetails.strInstructions}
//           </Typography>
//           <Typography paragraph>Glass:</Typography>
//           <Typography paragraph>
//             {singleDrinkDetails.strGlass}
//           </Typography>
//           <Typography paragraphy>Type:</Typography>
//           <Typography>
//            {singleDrinkDetails.strAlcoholic}
//           </Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// }


// {/* <Modal
//             open={open}
//             onClose={handleClose}
//             onSubmit={handleSubmitFavorite}
//             aria-labelledby="simple-modal-title"
//             aria-describedby="simple-modal-description"
//             style={{
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "10px",
//             }}
//             spacing={3}
//           > */}     {/* </Modal> */}