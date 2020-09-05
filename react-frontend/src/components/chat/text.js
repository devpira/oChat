import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'
import { SocketContext } from '../../common/socketio'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },



}));

const Test = () => {
    const classes = useStyles();

    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.emit("Login", false, (value) => {
            if (value) {
                console.log("HE SENT TRU")
            } else{
                console.log("HE SENT False")
            }
        })
    }, [])

    return (
  
            <div className={classes.root}>

            </div>
 
    );
}

export default Test;
