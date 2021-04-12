import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Nav/Navigation";
import ProfilePage from "./components/ProfilePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PasswordReset from "./components/PasswordReset";
import { UserContext } from "./Providers/UserProvider";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Home from "./pages/Home";
import Search from "./pages/Search";
import bg from "./assets/img/search2.jpeg";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import "./index.css";

const styles = (theme) => ({
  "@global": {
    body: {
      backgroundImage: `url("${bg}")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      height: "100%",
    },
    html: {
      height: "100%",
    },
    "#componentWithId": {
      height: "100%",
    },
  },
});

function App() {
  const userContext = useContext(UserContext);
  const token = userContext.token;

  return (
    <>
      <CssBaseline />
      <Router>
        <div
          className="App"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Navigation />
          {token && (
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/profile" component={ProfilePage} />
            </Switch>
          )}
          {!token && (
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/passwordreset" component={PasswordReset} />
              <Route exact path="/search" component={SignIn} />
              <Route exact path="/favorites" component={SignIn} />
              <Route exact path="/about" component={SignIn} />
              <Route exact path="/profile" component={SignIn} />
            </Switch>
          )}
        </div>
      </Router>
    </>
  );
}

export default withStyles(styles)(App);
