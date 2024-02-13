import { Alert, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import './home.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from '../../components/productCard/productCard';
import ProgressIndicator from '../../components/progressIndicator/progressIndicator';
import { useLocation, useOutletContext } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const dataCtx = useOutletContext();
    let showNotification = location.state?.showNotification;
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState();
    const [notificationMessage, setNotificationMessage] = useState('');
    const [sortedProductsLabel, setProductSortLabel] = useState('default');

    useEffect(() => {
        fetchCategoriesHandler();
        fetchProductsHandler();
        showNotificationBar();
    }, []);

    useEffect(() => {
        handleSearchProducts()
    }, [dataCtx])

    const showNotificationBar = () => {
        if (showNotification) {
            setNotificationMessage('Order place successfully!')
            setOpenSnackBar(true);
            window.history.replaceState({}, "");
        }
    }

    const displayMessage = (message) => {
        setNotificationMessage(message)
        setOpenSnackBar(true);
    }


    const fetchProductsHandler = () => {
        setLoading(true);
        axios
            .get("https://fakestoreapi.com/products")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }

    const fetchProductByCategory = (category) => {
        setLoading(true);
        axios
            .get(`https://fakestoreapi.com/products/category/${category}`)
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }

    const fetchSortedProducts = (sortType) => {
        setLoading(true);
        axios
            .get(`https://fakestoreapi.com/products?sort=${sortType}`)
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }

    const handleModalOpen = (id) => {
        setDeleteModalOpen(true);
        setDeleteProductId(id);
    };

    const handleModalClose = () => {
        setDeleteModalOpen(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    const fetchCategoriesHandler = () => {
        setLoading(true);
        axios
            .get("https://fakestoreapi.com/products/categories")
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }

    const deleteProductHandler = () => {
        setDeleteLoading(true);
        axios
            .delete(`https://fakestoreapi.com/products/${deleteProductId}`)
            .then((response) => {
                setDeleteLoading(false);
                setDeleteModalOpen(false);
                console.log(response)
                displayMessage("Deleted " + response.data.title)
            })
            .catch((error) => {
                setDeleteLoading(false);
            });
    }

    const handleProductSort = (event) => {
        fetchSortedProducts(event.target.value);
        setProductSortLabel(event.target.value);
    };

    const listItems = categories.map((category) => (
        <Button onClick={() => {
            fetchProductByCategory(category)
        }} key={category}>{category}</Button>
    ));

    const availableProducts = products.map((product) => (
        <ProductCard key={product.id} id={product.id} imageSrc={product.image} productName={product.title} price={product.price} description={product.description} triggerDeleteModal={handleModalOpen.bind(null, product.id)} />
    ));

    const handleSearchProducts = () => {
        //console.log(dataCtx)
        if (dataCtx === '') {
            fetchProductsHandler();
        } else {
            const filteredProducts = products.filter(product => product.title.toLowerCase().includes(dataCtx));
            //console.log(filteredProducts)
            setProducts(filteredProducts);
        }

    }

    return <>
        <div className='cat-button-group-container'>
            <ButtonGroup variant="outlined" >
                {listItems}
            </ButtonGroup>
        </div>
        <div className='loader-container'>

            {loading ? <ProgressIndicator /> : ''}
        </div>
        <div className='sort-form-outer-container'>
            <FormControl className='sort-form-container'>
                <InputLabel id="sort-products">Sort</InputLabel>
                <Select
                    labelId="sort-products"
                    id="sort-products"
                    value={sortedProductsLabel}
                    label="Sort"
                    onChange={handleProductSort}
                >
                    <MenuItem value={'default'}>Default</MenuItem>
                    <MenuItem value={'desc'}>Price: High to Low</MenuItem>
                    <MenuItem value={'asc'}>Price: Low to High</MenuItem>
                    <MenuItem value={'descs'}>Newest</MenuItem>
                </Select>
            </FormControl>
        </div>

        <div className='products-container'>
            {availableProducts}
        </div>

        <Dialog
            open={deleteModalOpen}
            onClose={handleModalOpen}
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirm deletion of product"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete the product?
                </DialogContentText>
            </DialogContent>
            <DialogActions>

                <Button variant='contained' onClick={deleteProductHandler} autoFocus>
                    {deleteLoading ? <ProgressIndicator /> : 'Delete'}
                </Button>
                <Button onClick={handleModalClose}>Cancel</Button>
            </DialogActions>
        </Dialog>

        <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
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
}

export default Home;