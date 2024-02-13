import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import ProgressIndicator from "../progressIndicator/progressIndicator";
//import { useForm } from "react-hook-form";
import './address.css';

function AddressForm(props) {
    // const { register, handleSubmit, reset } = useForm();
    const [submittedAddress, setSubmittedAddress] = useState(false);
    //const [savedAddress, setSavedAddress] = React.useState('');

    const [name, SetName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [landmark, setLandmark] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [loading, setLoading] = useState('');

    const savedUserAddress = {
            name: 'Martin',
            contactNumber:'9876543210',
            street:'abc street',
            city:'Pune',
            state:'Maharastra',
            landmark:'near airport',
            zipcode:'411014',
    }

    const onSubmitAddress = (data) => {
        console.log(data);
        setSubmittedAddress(true);
    };

    const handleProductSort = () => {
        SetName(savedUserAddress.name);
        setContactNumber(savedUserAddress.contactNumber);
        setStreet(savedUserAddress.street);
        setCity(savedUserAddress.city);
        setState(savedUserAddress.state);
        setLandmark(savedUserAddress.landmark);
        setZipCode(savedUserAddress.zipcode);
      };

    return (
    <>
    <div className="address-form-continer-1">

        <div className='address-select-outer-container'>
            <FormControl className='sort-form-container-1'>
                <InputLabel id="sort-products">Sort</InputLabel>
                <Select
                    labelId="sort-products"
                    id="sort-products"
                    value={name}
                    label="Sort"
                    onChange={handleProductSort}
                >
                    <MenuItem value={'default'}>Pune Home -- street, pune.</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div className="helper-text">
                <p>-OR-</p>
                <h3>Add Address</h3>
        </div>
                
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
