import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/navigationBar/navigationBar";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

function RootLayout() {
    // Define state in the parent component
    const [data, setData] = useState(null);

    // Function to update the state
    const updateData = (newData) => {
        setData(newData);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);


    return <>
        <Box sx={{ flexGrow: 1 }}>
            <NavigationBar data={data} updateData={updateData} />
            <Outlet  context={data}/>
        </Box>
    </>
}

export default RootLayout;