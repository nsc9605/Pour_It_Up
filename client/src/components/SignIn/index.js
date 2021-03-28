import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth } from "../../firebase";
// import CocktailData from "../CocktailData/CocktailData";
import { signInWithGoogle } from "../../firebase";

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('res: ', res);
        return (
          <Redirect to="/profile" />
        );
        // TODO: Set user Context
        // TODO: set redirect here
      })
      .catch(error => {
        setError("Error signing in with password and email!");
        console.error("Error signing in with password and email", error);
      });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  const handlePopup = () => {
    signInWithGoogle();
  }

  return (
    <div className="container">
      <h1>Sign In</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <form>
          <label htmlFor="userEmail">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="example@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword">
            Password:
          </label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <button onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
              Sign in
          </button>
        </form>
        <p>or</p>
        <button onClick={() => {handlePopup()}}>
          Sign in with Google
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to="/passwordreset">
            Forgot Password?
          </Link>
        </p>
        {/* COCKTAIL DATA
        <CocktailData>
          <p>{props.name}</p>
          <img alt="thumbnail">{props.image}</img>
        </CocktailData> */}
      </div>
    </div>
  );
};

export default SignIn;