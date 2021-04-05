import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar"
// import Avatar from "react-avatar";
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
  const { user } = useContext(UserContext);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Avatar key={user} alt={props.name} src={user.photoURL} className={classes.large} /> */}
    </div>
  );
}