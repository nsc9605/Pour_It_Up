import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import ProfilePage from "../ProfilePage";
import PasswordReset from "../PasswordReset";

function Application() {
  const user = null;
  return (
        user ?
        <ProfilePage />
      :
        <Router>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path = "/passwordReset" component={PasswordReset} />
        </Router>

  );
}
export default Application;