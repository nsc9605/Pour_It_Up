import React, { useState,  } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithGoogle } from "../../firebase";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const history = useHistory();

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    console.log(email, password)
    auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        history.push("/home");
      })
      .catch(error => {
        setError("Error signing in with password and email!");
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
          <label htmlFor="userEmail" className="mx-2">
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
          <label htmlFor="userPassword" className="mx-2">
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
          <button className="ml-2 rounded" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
              Sign in
          </button>
        </form>
        <p>or</p>
        <button className="my-2 rounded" onClick={() => {handlePopup()}}>
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
      </div>
    </div>
  );
};

export default SignIn;