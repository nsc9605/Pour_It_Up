import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Nav/Navigation";
import ProfilePage from "./components/ProfilePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PasswordReset from "./components/PasswordReset";
// import UserProvider from "./Providers/UserProvider";
import { UserContext } from "./Providers/UserProvider";
import Header from "./components/Header/Header";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import './index.css';


function App() {
  const user = useContext(UserContext);
  console.log("user: ", user);
  console.log("userstate: ", user.user)
  return (
    <Router>
      <div className="App">
        {user.user && (
          <Switch>
            <Navigation />
            <Header />
              <Route exact path="/home" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/profile" component={ProfilePage} />
          </Switch>
        )}
        {!user.user && (
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="signup" component={SignUp} />
            <Route exact path="passwordreset" component={PasswordReset} />
          </Switch>
        )}
      </div>
    </Router>
  );
}



export default App;
