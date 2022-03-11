import * as React from 'react';
import {
    Outlet
  } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import SidebarNavigation from './SidebarNavigation';
import './Dashboard.scss';

const Dashboard = () => {
    return (
        <Grid 
            container
            className={'dashboard'}
        >   
            <Grid  item >
                <SidebarNavigation/>
            </Grid>
            <Divider className='divider'  orientation="vertical" flexItem/>
            <Grid className='dashSection' item sx={{p:'50px'}}>
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