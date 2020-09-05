import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper } from '@material-ui/core'
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    content: {
        height: '100%'
    },
    marginAutoContainer: {
        width: 500,
        height: 80,
        display: 'flex',
        backgroundColor: 'gold',
    },
    marginAutoItem: {
        margin: 'auto'
    },
    grid: {
        height: '100%',
        // backgroundImage: 'url(https://cdn.suwalls.com/wallpapers/nature/frosty-winter-morning-in-the-mountains-28785-1920x1080.jpg)',
        backgroundImage: 'url(/images/DJI_0002.JPG)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    paper: {
        height: '650px',
        width: "470px",
    },

    insideGrid: {
        padding: theme.spacing(6)
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    textField: {
        marginTop: theme.spacing(3),
    },
    signInButton: {
        marginTop: theme.spacing(5),
        borderRadius: "35px"
    }
}));

const MainLoginPage = () => {
    const classes = useStyles();
    const [page, setPage] = useState(1)


    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.grid}
            >
                <Paper elevation={5} className={classes.paper} >
                    {
                        page === 1 ? <LoginPage onRegisterClicked={() => setPage(2)} />
                            :

                            <RegisterPage onGoBackClicked={() => setPage(1)} />
                    }

                </Paper>
            </Grid>
        </div>
    );
}

export default MainLoginPage;
