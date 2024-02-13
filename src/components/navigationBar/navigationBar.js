import './navigationBar.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';

import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';
//import { useEffect, useState } from 'react';

function NavigationBar() {
    var token = useRouteLoaderData('root');
    const product_details_token =  useRouteLoaderData('product-details-root'); 

    if(!token){
        token = product_details_token;
    }

    const navigate = useNavigate();
   // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     checkUserToken();
    // }, []);


    // const checkUserToken = () => {
    //     const userToken = localStorage.getItem('user-token');
    //     if (!userToken || userToken === 'undefined') {
    //         setIsLoggedIn(false);
    //     }else{
    //         setIsLoggedIn(true);
    //     }
    //   }

    function handleSearchInput(value) {
        console.log("Search input:", value);
        // Process the search input here, e.g., send it to your backend for search
    }

    function logoutHandler(){
        localStorage.clear();
       // checkUserToken();
        navigate('/auth');
    }


    return (
        <div className="test">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Upgrad E-Shop
                    </Typography>

                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <SearchIcon />
                    </IconButton>
                    <InputBase className='search-box'
                        sx={{ flex: 1, ml: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(event) => handleSearchInput(event.target.value)}
                    />
                    
                    {token && <Button variant="text" color="inherit" component={Link} to="/">Home</Button>}
                    {token && token.userRole ==='ADMIN' && <Button variant="text" color="inherit">Add Products</Button>}
                    {!token && <Button variant="text" color="inherit" component={Link} to="/auth"> Login</Button>}
                    {!token && <Button variant="text" color="inherit" component={Link} to="/sign-up">SignUp</Button>}
                    {token &&  <Button variant="contained" color="info" onClick={() => {
                        logoutHandler()
                    }} >LogOut</Button>}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavigationBar;
