import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import ProgressIndicator from "../progressIndicator/progressIndicator";
//import { useForm } from "react-hook-form";
import './address.css';

function AddressForm(props) {
    // const { register, handleSubmit, reset } = useForm();
    const [submittedAddress, setSubmittedAddress] = useState(false);

    const [name, SetName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [landmark, setLandmark] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [loading, setLoading] = useState('');

    const onSubmitAddress = (data) => {
        console.log(data);
        setSubmittedAddress(true);
    };

    return (
    <>
    <div className="address-form-continer-1">
        <form onSubmit={onSubmitAddress}>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 2 }}
                value={name}
                onChange={(event) => SetName(event.target.value)}
            />
            <TextField
                label="Contact Number"
                variant="outlined"
                fullWidth
                required
                type="text"
                sx={{ mb: 2 }}
                value={contactNumber}
                onChange={(event) => setContactNumber(event.target.value)}
            />
            <TextField
                label="Street"
                variant="outlined"
                fullWidth
                required
                type="text"
                sx={{ mb: 2 }}
                value={street}
                onChange={(event) => setStreet(event.target.value)}
            />
            <TextField
                label="City"
                variant="outlined"
                fullWidth
                required
                type="text"
                sx={{ mb: 2 }}
                value={city}
                onChange={(event) => setCity(event.target.value)}
            />
            <TextField
                label="State"
                variant="outlined"
                fullWidth
                required
                type="text"
                sx={{ mb: 2 }}
                value={state}
                onChange={(event) => setState(event.target.value)}
            />
            <TextField
                label="Landmark"
                variant="outlined"
                fullWidth
                required
                type="text"
                sx={{ mb: 2 }}
                value={landmark}
                onChange={(event) => setLandmark(event.target.value)}
            />
            <TextField
                label="Zip Code"
                variant="outlined"
                fullWidth
                required
                type="text"
                sx={{ mb: 2 }}
                value={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
            >
                {loading ? <ProgressIndicator /> : 'Save Address'}
            </Button>
        </form>
    </div>
    </>
    );
}

export default AddressForm;
