import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";
import axios from "axios";
import ProgressIndicator from "../../components/progressIndicator/progressIndicator";
import { Link, useNavigate } from "react-router-dom";
import './signup.css';
import Footer from "../../components/footer/footer";

function SignUpForm() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default browser behavior
        setLoading(true);
        const loginAPI = 'https://fakestoreapi.com/users';
        const reqBody = {
            email: 'John@gmail.com',
            username: 'johnd',
            password: 'm38rmF$',
            name: {
                firstname: 'John',
                lastname: 'Doe'
            },
            address: {
                city: 'kilcoole',
                street: '7835 new road',
                number: 3,
                zipcode: '12926-3874',
                geolocation: {
                    lat: '-37.3159',
                    long: '81.1496'
                }
            },
            phone: '1-570-236-7033'
        }
        axios.post(loginAPI, reqBody).then((response) => {
            const data = response.data;
            const token = data.token;
            // if (!token) {
            //     alert('Unable to Signup. Please try after some time.');
            //     setLoading(false);
            //     return;
            // }
            localStorage.clear();
            localStorage.setItem('user-token', 'fwefwfwfwfvergepgrtohihtteononm33423242442====');

            localStorage.setItem('user-role', 'USER');

            navigate('/');
            setLoading(false);
        }).catch((error) => {
            alert("Oops! Some error occured.");
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
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First name"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <TextField
                        label="Last name"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        type="email"
                        sx={{ mb: 2 }}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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
                    <TextField
                        label="Confirm password"
                        variant="outlined"
                        fullWidth
                        required
                        type="password"
                        sx={{ mb: 2 }}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    <TextField
                        label="Contact number"
                        variant="outlined"
                        fullWidth
                        required
                        type="tel"
                        sx={{ mb: 2 }}
                        value={contactNumber}
                        onChange={(event) => setContactNumber(event.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        {loading ? <ProgressIndicator /> : 'Sign Up'}
                    </Button>
                </form>
                <p>Already have an account? <Link to='/auth'> Login</Link></p>
            </Paper>
            <Footer />
        </>
    );
}

export default SignUpForm;
