import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import './home.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from '../../components/productCard/productCard';
import ProgressIndicator from '../../components/progressIndicator/progressIndicator';

function Home() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [sortedProductsLabel, setProductSortLabel] = React.useState('default');


    useEffect(() => {
        fetchCategoriesHandler();
        fetchProductsHandler();
    }, []);


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

    const fetchSortedProducts = (sortType) =>{
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
        <ProductCard key={product.id} imageSrc={product.image} productName={product.title} price={product.price} description={product.description} />
    ));

    return <>
        <div className='cat-button-group-container'>
            <ButtonGroup variant="outlined" >
                {listItems}
            </ButtonGroup>
        </div>
        <div className='loader-container'>

       {loading?<ProgressIndicator />:''} 
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

    </>
}

export default Home;