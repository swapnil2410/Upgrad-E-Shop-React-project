import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/navigationBar/navigationBar";
import { Box } from "@mui/material";

function RootLayout(){
    return <>
    <Box sx={{ flexGrow: 1 }}>
        <NavigationBar/>
        <Outlet/>
    </Box>
    </>
}

export default RootLayout;