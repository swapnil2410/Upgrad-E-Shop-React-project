import { Link, useLocation, useNavigate } from 'react-router-dom';
import './productDetails.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, CardMedia, Chip, TextField } from '@mui/material';

function ProductDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const productId = location.state?.id;
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(1);
    
    useEffect(() => {
        fetchProductsDetails(productId)
    }, [productId])

    const productBuyHandler = (product) =>{
        navigate('/order-details',{ state: { product: {...product, qty:value} } });
    }

    const handleChange = (event) => {
        // Remove all non-numeric characters from the input
        const newValue = event.target.value.replace(/\D/g, "");
        // Set the value state to the parsed integer or 0 if empty
        setValue(parseInt(newValue) || 0);
      };

    const fetchProductsDetails = (productId) => {
        setLoading(true);
        axios
            .get(`https://fakestoreapi.com/products/${productId}`)
            .then((response) => {

                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }

    return <>
        <div className='card-container-1'>
            <div className='image-container'>
                <CardMedia
                    sx={{ height: 400, width: 300 }}
                    image={product?.image}
                    title={product?.title}
                />
            </div>
            <div className='details-container'>
            
                <div className='title-available-qualtity'>
                    <h3 className='title-1'>{product?.title}</h3>
                    <Chip label={'Available quantity ' + product.rating?.count} />
                </div>

                <div>
                    category: <strong>{product?.category}</strong>
                </div>
                <div>
                    <p>{product.description}</p>
                </div>
                <div>
                    <h2 className='prod-price'>Rs. {product?.price}</h2>
                </div>
                <div className='qunty-container'>
                    <TextField
                        label="Number"
                        type="number"
                        value={value}
                        onChange={handleChange}
                        inputProps={{
                            // Use the inputMode attribute to show a numeric keyboard on mobile devices
                            inputMode: "numeric",
                        }}
                    />
                </div>
                <div>
                <Button variant="contained" onClick={() => {
                        productBuyHandler(product)
                    }}>Place order</Button>
                </div>
            </div>
        </div>
    </>
}

export default ProductDetails;




