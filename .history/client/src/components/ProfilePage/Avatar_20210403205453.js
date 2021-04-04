import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from 'react-avatar';
import { UserContext } from "../../Providers/UserProvider";

// function Contact() {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }));
    
    export default function UserAvatar(props) {
        const { user } = useContext(UserContext);
        const classes = useStyles();
        // const { photoURL, name, email } = user;
        return (
        <div className={classes.root}>
          <Avatar key={props.user} alt={props.name} src={props.photoURL} />
        </div>
      );
    }