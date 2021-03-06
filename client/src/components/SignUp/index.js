import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithGoogle } from "../../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      auth.generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error signing up ith email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  const handlePopup = () => {
    signInWithGoogle();
  };

  return (
    <div className="container">
      <h1 id="title">Sign Up</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <form>
          <label htmlFor="displayName" className="userInput">
            <strong>Display Name:</strong>
          </label>
          <input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Your Name"
            id="displayName"
            onChange={(event) => onChangeHandler(event)}
          />
          <br />{" "}
          <label htmlFor="userEmail" className="userInput">
            <strong>Email:</strong>
          </label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="example@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="userInput">
            <strong>Password:</strong>
          </label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <button id ="signUp"
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>
        <p>
          Already have an account? <Link to="/">Sign in here</Link>
        </p>
        <p id="or">or</p>
        <button id="google"
          onClick={() => {
            handlePopup();
          }}
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
