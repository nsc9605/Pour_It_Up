import React, { Component, createContext } from "react";
import { auth } from "../firebase";
import { generateUserDocument } from "../firebase";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });
  };

  updateUser = (user) => {
    this.setState({ user });
  }

  render() {
    return (
      <UserContext.Provider value={{...this.state, updateUser:this.updateUser}}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;