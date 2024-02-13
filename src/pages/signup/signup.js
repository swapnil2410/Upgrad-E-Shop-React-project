import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";

function SignUpForm() {
  // Use state hooks to store the input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  // Handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default browser behavior
    console.log("First name:", firstName); // Log the first name for debugging
    console.log("Last name:", lastName); // Log the last name for debugging
    console.log("Email:", email); // Log the email for debugging
    console.log("Password:", password); // Log the password for debugging
    console.log("Confirm password:", confirmPassword); // Log the confirm password for debugging
    console.log("Contact number:", contactNumber); // Log the contact number for debugging
    // Do something with the input values here, e.g., send them to your backend for registration
  };

  return (
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
          Sign Up
        </Button>
      </form>
    </Paper>
  );
}

export default SignUpForm;
