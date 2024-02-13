import './login.css';
import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";
import axios from 'axios';

function Login() {
    // Use state hooks to store the username and password inputs
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default browser behavior
        console.log("Username:", username); // Log the username for debugging
        console.log("Password:", password); // Log the password for debugging
        // Do something with the username and password here, e.g., send them to your backend for authentication
        
       const loginAPI='https://fakestoreapi.com/auth/login';
      const reqBody={
        username: "mor_2314",
        password: "83r5^_"
        }
        axios.post(loginAPI, reqBody).then((response) => {
            console.log("login res=> ",response);
            const data = response.data;
            const token = data.token;
            if (!token) {
                alert('Unable to login. Please try after some time.');
                return;
            }
            localStorage.clear();
            localStorage.setItem('user-token', token);
    }).catch((error) => {
            alert("Oops! Some error occured.");
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
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
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
                            Login
                        </Button>
                    </form>
                    <p>Don't have an account? SignUp</p>
                </Paper>
                
        </>
    );
}

export default Login;
