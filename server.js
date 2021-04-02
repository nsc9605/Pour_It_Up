const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
//   })
// } else 

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.ATLAS_URI || "mongodb://localhost/cocktailsdb",
  
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Mongoose is connected");
  }
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
