import { Alert, Button, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './addProduct.css'
import ProgressIndicator from "../../components/progressIndicator/progressIndicator";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AddProductForm = (props) => {
    const location = useLocation();
    let updateType = location.state?.updateType;
    let id = location.state?.id;
    let imageSrc = location.state?.imageSrc;
    let productName = location.state?.productName;
    let productPrice = location.state?.price;
    let description = location.state?.description;


    const [loading, setLoading] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [name, setName] = useState("");
    const [furniture, setFurniture] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [availableItems, setAvailableItems] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [notificationMessage, setNotificationMessage] = useState('');
    const [productDescription, setProductDescription] = useState("");


    useEffect(()=>{
        if(updateType !== 'ADD'){
            setName(productName);
            setFurniture('chair');
            setManufacturer('Nilkamal');
            setAvailableItems(25);
            setPrice(productPrice);
            setImageURL(imageSrc);
            setProductDescription(description);
        }
    },[])

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
      const product =  {
            title:name,
            furniture,
            manufacturer,
            availableItems,
            price,
            imageURL,
            productDescription,
        };
        
        if(updateType === 'ADD'){
            axios
            .post(`https://fakestoreapi.com/products`,product)
            .then((response) => {
                setLoading(false);
                displayMessage("Product " +response.data.title + ' added successfully')
            })
            .catch((error) => {
                setLoading(false);
            });
        }else{
            axios
            .put(`https://fakestoreapi.com/products/${id}`,product)
            .then((response) => {
                setLoading(false);
                displayMessage("Updated Product " +response.data.title + ' added successfully')
            })
            .catch((error) => {
                setLoading(false);
            });
        }
        
    };

    const displayMessage = (message) =>{
        setNotificationMessage(message)
        setOpenSnackBar(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackBar(false);
      };

    return (
    <>

        <div className="add-product-form-container">
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" align="center">
                   {updateType === 'ADD'?'Add Product':'Update Product'}
                </Typography>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Comfortable Chair"
                    fullWidth
                    required
                    margin="dense"
                />
                <Select
                    label="Furniture"
                    value={furniture}
                    onChange={(e) => setFurniture(e.target.value)}
                    fullWidth
                    required
                    margin="dense"
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="chair">Chair</MenuItem>
                    <MenuItem value="table">Table</MenuItem>
                    <MenuItem value="sofa">Sofa</MenuItem>
                    <MenuItem value="bed">Bed</MenuItem>
                </Select>
                <TextField
                    label="Manufacturer"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    placeholder="Nilkamal"
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    label="Available Items"
                    value={availableItems}
                    onChange={(e) => setAvailableItems(e.target.value)}
                    placeholder="10"
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="10000"
                    fullWidth
                    required
                    type="number"
                    margin="dense"
                />
                <TextField
                    label="Image URL"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    label="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    required
                    margin="dense"
                />
                
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    required
                    margin="dense"
                >
                    {loading ? <ProgressIndicator /> : 'SAVE PRODUCT'}
                    
                </Button>
            </form>
        </div>
        <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{horizontal:'right',vertical:'top'}}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
    );
};

export default AddProductForm;
