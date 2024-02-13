import './navigationBar.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';

import {Link} from 'react-router-dom';

function NavigationBar() {


    function handleSearchInput(value) {
        console.log("Search input:", value);
        // Process the search input here, e.g., send it to your backend for search
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
                    
                     <Button variant="text" color="inherit" component={Link} to="/">Home</Button>
                    <Button variant="text" color="inherit">Add Products</Button>
                    <Button variant="text" color="inherit" component={Link} to="/auth"> Login</Button>
                    <Button variant="text" color="inherit" component={Link} to="/sign-up">SignUp</Button>
                    <Button variant="contained" color="info">LogOut</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavigationBar;
