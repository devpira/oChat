import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, TextField, Button, Link } from '@material-ui/core'
import validate from 'validate.js';

const schema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 255
        }
    },
    displayName: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 50,
            minimum: 4
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 50,
            minimum: 4
        }
    },
    repassword: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 50,
            minimum: 4
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
    goBackLink: {
        marginTop: theme.spacing(5),
    }
}));

const RegisterPage = ({ onGoBackClicked }) => {
    const classes = useStyles();

    const [passwordError, setPasswordError] = useState(null);

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

    const handleFormSubmit = () => {
        setPasswordError(null)
        if (formState.values.password !== formState.values.repassword) {
            setPasswordError("Passwords do not match.")
            return;
        }
        // if (!formState.values.name)
        //     return false;
        // createMenu(formState.values.name)
        // setFormState({
        //     isValid: false,
        //     values: {},
        //     touched: {},
        //     errors: {}
        // });
        // return true;

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
                <strong>Sign Up</strong>
            </Typography>

            <TextField
                className={classes.textField}
                error={hasError('email')}
                fullWidth
                helperText={
                    hasError('email') ? formState.errors.email[0] : null
                }
                label="Email address"
                name="email"
                onChange={handleChange}
                type="text"
                value={formState.values.email || ''}

            />
            <TextField
                className={classes.textField}
                error={hasError('displayName')}
                fullWidth
                helperText={
                    hasError('displayName') ? formState.errors.displayName[0] : null
                }
                label="Display Name"
                name="displayName"
                onChange={handleChange}
                type="text"
                value={formState.values.displayName || ''}

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
            <TextField
                className={classes.textField}
                error={hasError('repassword') || passwordError}
                fullWidth
                helperText={
                    hasError('repassword') ? formState.errors.repassword[0] : passwordError
                }
                label="Confirm Password"
                name="repassword"
                onChange={handleChange}
                type="password"
                value={formState.values.repassword || ''}

            />
            <Button
                className={classes.signInButton}
                color="primary"
                disabled={!formState.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleFormSubmit}
            >
                Sign up now
            </Button>

            <Link
                component="button"
                variant="body1"
                onClick={onGoBackClicked}
                className={classes.goBackLink}
            >
                <strong> Go Back</strong>
            </Link>
        </Grid >
    );
}

export default RegisterPage;