import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Nav/Navigation";
import ProfilePage from "./components/ProfilePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PasswordReset from "./components/PasswordReset";
import { UserContext } from "./Providers/UserProvider";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Search from "./pages/Search";
import './index.css';


function App() {
  const userContext = useContext(UserContext);
  const token = userContext.token;

return (
  <Router>
    <div className="App">
      <Navigation />
      {token && (
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/profile" component={ProfilePage} />
        </Switch>
      )}
      {!token && (
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/passwordreset" component={PasswordReset} />
        </Switch>
      )}
    </div>
  </Router>
);
}



export default App;
