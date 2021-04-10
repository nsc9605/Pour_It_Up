// import React, { useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar"
// import { UserContext } from "../../Providers/UserProvider";
// import { auth } from "../../firebase";


// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// export default function UserAvatar(props) {
//   const { user } = useContext(UserContext);
//   const classes = useStyles();
//   console.log(auth.currentUser)
//   return (
//     <div className={classes.root}>
//      {user&& <Avatar key={user} alt={user.name} src={auth.currentUser.photoURL} className={classes.large} />}
//     </div>
//   );
// }
