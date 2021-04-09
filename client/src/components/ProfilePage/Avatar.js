import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar"
import { UserContext } from "../../Providers/UserProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function UserAvatar(props) {
  // const { user } = useContext(UserContext);
  // const { photoURL, name } = user;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Avatar key={user} alt={user.name} src={user.photoURL} className={classes.large} /> */}
    </div>
  );
}
