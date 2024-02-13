import './login.css';
import React, { useEffect, useState } from "react";
import { Button, TextField, Paper, Typography, Radio, FormControlLabel, FormLabel, RadioGroup, FormControl, Snackbar, Alert } from "@mui/material";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ProgressIndicator from '../../components/progressIndicator/progressIndicator';
import Footer from '../../components/footer/footer';

function Login() {
    const navigate = useNavigate();
    // Use state hooks to store the username and password inputs
    const [username, setUsername] = useState("mor_2314");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [password, setPassword] = useState("83r5^_");
    const [radioValue, setRadioValue] = React.useState('');
    const [loading, setLoading] = useState(false);
    const adminUser = 'mor_2314';

    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
        } else {
            navigate('/')
        }

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    useEffect(() => {
        checkUserToken();
    }, []);

    const displayMessage = (message) => {
        setNotificationMessage(message)
        setOpenSnackBar(true);
    }

    const userTypeHandler = (event) => {
        const user = event.target.value;
        setRadioValue(event.target.value);
        if (user === 'ADMIN') {
            setUsername("mor_2314");
            setPassword("83r5^_");
        } else {
            setUsername("johnd");
            setPassword("m38rmF$");
        }
    }

    // Handle the form submission
    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault(); // Prevent the default browser behavior
        console.log("Username:", username); // Log the username for debugging
        console.log("Password:", password); // Log the password for debugging

        const loginAPI = 'https://fakestoreapi.com/auth/login';
        const reqBody = {
            username: username,
            password: password
        }
        axios.post(loginAPI, reqBody).then((response) => {
            console.log("login res=> ", response);
            const data = response.data;
            const token = data.token;
            if (!token) {
                displayMessage("Invalid Email/Password")
                return;
            }
            localStorage.clear();
            localStorage.setItem('user-token', token);
            if (username === adminUser) {
                localStorage.setItem('user-role', 'ADMIN');
            } else {
                localStorage.setItem('user-role', 'USER');
            }
            navigate('/');
            setLoading(false);
        }).catch((error) => {
            displayMessage("Invalid Email/Password")
            setLoading(false);
        });
    };

    return (
        <>
            <Paper className='loginForm-container'
                sx={{
                    width: 400,
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Login
                </Typography>

                <FormControl>
                    <FormLabel id="user-type">Choose user type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="user-type"
                        name="row-radio-buttons-group"
                        value={radioValue}
                        defaultValue="USER"
                        onChange={userTypeHandler}
                    >
                        <FormControlLabel value="USER" control={<Radio />} label="Customer" />
                        <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />

                    </RadioGroup>
                </FormControl>


                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ mb: 2 }}

                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        type="password"
                        sx={{ mb: 2 }}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        {loading ? <ProgressIndicator /> : 'Login'}
                    </Button>
                </form>
                <p>Don't have an account? <Link to='/sign-up'> SignUp</Link></p>
            </Paper>
            <Footer />
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {notificationMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Login;
