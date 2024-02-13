import { Link, useLocation, useNavigate } from 'react-router-dom';
import './order.css';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Snackbar } from '@mui/material';
import React from 'react';
import Address from '../../components/address/address';
//import AddressForm from '../../components/address/address';
import OrderConfirm from '../../components/orderConfirm/orderConfirm';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import  { useState } from "react";
import ProgressIndicator from '../../components/progressIndicator/progressIndicator';
const steps = ['Items', 'select Address', 'Confirm Order'];
let savedAddress;
let submittedAddress = false;

function AddressForm(props) {
   // const [submittedAddress, setSubmittedAddress] = useState(false);
    //const [savedAddress, setSavedAddress] = useState('');
    
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

    

    const handleProductSort = () => {
        SetName(savedUserAddress.name);
        setContactNumber(savedUserAddress.contactNumber);
        setStreet(savedUserAddress.street);
        setCity(savedUserAddress.city);
        setState(savedUserAddress.state);
        setLandmark(savedUserAddress.landmark);
        setZipCode(savedUserAddress.zipcode);
      };

      const saveAddressHandler =(event) =>{
        event.preventDefault();
        const address ={
            name,
            contactNumber,
            street,
            city,
            state,
            landmark,
            zipCode    
        }
        savedAddress = address;
        submittedAddress = true;
        alert("Address saved");

      }

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
                    <MenuItem value={'Martin'}>Pune Home -- street, pune.</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div className="helper-text">
                <p>-OR-</p>
                <h3>Add Address</h3>
        </div>
                
        <form onSubmit={saveAddressHandler}>
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

function Order() {
    const location = useLocation();
    const product = location.state?.product;
    const navigate = useNavigate();
    ///////////
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [activeStep, setActiveStep] = useState(1);
    const [skipped, setSkipped] = useState(new Set());

    const isStepOptional = (step) => {
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;

        if(activeStep === steps.length -1){
           // setOpenSnackBar(true)
            navigate('/',{ state: { showNotification:true } });

        }

        if(activeStep === steps.length -2 ){
            if(!submittedAddress){
                alert("Please enter address & press Save address button");
                return;
            }
        }

        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    ////////////////
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackBar(false);
      };
    ///////////


    return <>
        <div className='stepper-container'>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            
                <React.Fragment>
                   
                     {activeStep === 1 && <AddressForm/>}
                     {activeStep === 2 && <OrderConfirm product={product} address={savedAddress}/>}

                    <Box  className="bottom-buttons-container">
                        <Button
                            color="inherit"
                            disabled={activeStep === 1}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />


                        <Button variant='contained' onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Pace Order' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            
        </div>
        <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Order Placed Successfully"
      />
    </>
}

export default Order;