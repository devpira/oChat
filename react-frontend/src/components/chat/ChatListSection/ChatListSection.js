import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core'

import PeopleSearchBar from './PeopleSearchBar';
import ChatList from './ChatList';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: "400px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "-5px 0px 12px",
        zIndex: 1,
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.primary.main
    },

}));

const ChatListSection = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} >
            <Typography variant="h2" className={classes.title}>
                <strong>oChat</strong>
            </Typography>
            <PeopleSearchBar />
            <ChatList />
        </Paper>
    );
}

export default ChatListSection;