import './navigationBar.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, alpha } from '@mui/material';

import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';
import styled from '@emotion/styled';
//import { useEffect, useState } from 'react';

const Search = styled('div')(({ theme }) => ({

    position: 'relative',
    borderRadius: 5,
    backgroundColor: alpha('#ffffff', 0.15),
    '&:hover': {
      backgroundColor: alpha('#ffffff', 0.25),
    },
    marginRight: 300,
    marginLeft: 0,
    width: '20%',
    height: 35,
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
  

    padding: 2,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0, 
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
   
    color: 'inherit',
  '& .MuiInputBase-input': {
    padding: 2,
    width: '100%',
  },
  paddingRight: 30,
  paddingTop:5,
  paddingLeft:5,
  borderRadius: 5, 
  }));

function NavigationBar({ data, updateData }) {
    var token = useRouteLoaderData('root');
    const product_details_token = useRouteLoaderData('product-details-root');
    const order_details_token = useRouteLoaderData('order-details-root');
    const add_product_token = useRouteLoaderData('add-product-root');
    if (!token) {
        if (product_details_token) {
            token = product_details_token;
        }
        if (order_details_token) {
            token = order_details_token;
        }
        if (add_product_token) {
            token = add_product_token;
        }
    }

    const navigate = useNavigate();

    function handleSearchInput(value) {
        //console.log("Search input:", value);
            // Update data state
            updateData(value);
          
    }

    function logoutHandler() {
        localStorage.clear();
        navigate('/auth');
    }

    function navigateToAddProduct() {
        navigate("/add-product", { state: { updateType: 'ADD' } })
    }

    return (
        <div className="test">
            <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }} >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}

                    >
                        <Link to="/">

                            <ShoppingCartIcon sx={{ color: 'white' }} />
                        </Link>
                    </IconButton>
                    <Typography variant="h6" color={'white'} sx={{ flexGrow: 1, textDecoration: 'none' }} component={Link} to="/">
                        Upgrad E-Shop
                    </Typography>


                    {token && <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(event) => handleSearchInput(event.target.value)}
                        />
                    </Search>}



                    {token && <Button variant="text" color="inherit" component={Link} to="/">Home</Button>}
                    {token && token.userRole === 'ADMIN' && <Button variant="text" color="inherit" onClick={() => navigateToAddProduct()}>Add Product</Button>}
                    {!token && <Button variant="text" color="inherit" component={Link} to="/auth"> Login</Button>}
                    {!token && <Button variant="text" color="inherit" component={Link} to="/sign-up">SignUp</Button>}
                    {token && <Button variant="contained" color="info" onClick={() => {
                        logoutHandler()
                    }} sx={{ backgroundColor: 'red' }}>LogOut</Button>}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavigationBar;
