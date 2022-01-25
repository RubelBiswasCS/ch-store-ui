import * as React from 'react';
import {
    Outlet
  } from "react-router-dom";
import Grid from '@mui/material/Grid';
import SidebarNavigation from './SidebarNavigation';
import './Dashboard.scss';

const Dashboard = () => {
    return (

        <Grid 
            container
            className={'dashboard'}
        
        >   
            <Grid  item sx={{p:'50px',width:'20%',minHeight:'100%',overflow:'hidden',bgcolor:'blueviolet'}}>
                <SidebarNavigation/>
            </Grid>
            <Grid  item sx={{p:'50px'}}>
                <Outlet/>
            </Grid>
            
        </Grid>
    );
}

// direction='row'
// justiy='flex-start'
// alignItems='flex-start'
// sx={{minHeight:"100vh"}}

export default Dashboard;