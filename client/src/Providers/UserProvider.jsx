import React, { Component, createContext } from "react";
import { auth } from "../firebase";
import { generateUserDocument } from "../firebase";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      if (user === undefined) {
        const token = null;
        this.setState({ token });
      } else {
        const token = user.uid;
        this.setState({ token });
      }
    });
  };

  updateUser = (token) => {
    this.setState({ token });
  };

  render() {
    return (
      <UserContext.Provider
        value={{ ...this.state, updateUser: this.updateUser }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
