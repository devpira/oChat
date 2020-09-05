import React, { useState, useEffect, useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link } from '@material-ui/core'
import validate from 'validate.js';

import { FirebaseAuth, AuthContext } from '../../common/Authentication';

const schema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 100
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128,
        }
    }
};


const useStyles = makeStyles((theme) => ({

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
    },
    errorMessage: {
        marginTop: theme.spacing(3),
        color: "red",
        textAlign: "center"
    }
}));

const LoginPage = ({ history, onRegisterClicked }) => {
    const classes = useStyles();
    const [error, setError] = useState(null);

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [formState.values]);


    const handleChange = event => {
        event.persist();

        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true
            }
        }));
    };

    const handleSignIn = useCallback(
        async event => {
            event.preventDefault();
            setError(null);

            FirebaseAuth.auth().signInWithEmailAndPassword(formState.values.email, formState.values.password)
                .then(result => {
                    console.log("success")
                    history.push('/');
                })
                .catch(error => {
                    switch (error.code) {
                        case "auth/user-not-found":
                            setError("Invalid Email Address. Please try again.")
                            break;

                        case "auth/wrong-password":
                            setError("Invalid password. Please try again.")
                            break;

                        default:
                            setError(error.message)
                    }
                    console.log(error)
                });
        },
        [history, formState.values]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.insideGrid}
        >
            <Typography variant="h2" className={classes.title}>
                <strong>Login</strong>
            </Typography>
            <TextField
                className={classes.textField}
                error={hasError('email')}
                fullWidth
                helperText={
                    hasError('email') ? formState.errors.email[0] : null
                }
                label="Email Address"
                name="email"
                onChange={handleChange}
                type="text"
                value={formState.values.email || ''}

            />
            <TextField
                className={classes.textField}
                error={hasError('password')}
                fullWidth
                helperText={
                    hasError('password') ? formState.errors.password[0] : null
                }
                label="Password"
                name="password"
                onChange={handleChange}
                type="password"
                value={formState.values.password || ''}

            />
            {
                error && (<Typography variant="body1" className={classes.errorMessage}>
                    <strong>{error}</strong>
                </Typography>)
            }

            <Button
                className={classes.signInButton}
                color="primary"
                disabled={!formState.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleSignIn}
            >
                Sign in now
                        </Button>
            <Typography variant="body1" className={classes.textField}>
                <span> Don't have an account? </span>
                <Link
                    component="button"
                    variant="body1"
                    onClick={onRegisterClicked}
                >
                    <strong> Sign Up</strong>
                </Link>
            </Typography>
        </Grid >
    );
}

export default withRouter(LoginPage);