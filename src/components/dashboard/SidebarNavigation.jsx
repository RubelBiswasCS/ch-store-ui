import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';

import './Dashboard.scss';
const SidebarNavigation = () => {
    const [slidebarState, setSlidebarState] = React.useState({
        displayNavNames:"", 
    });
    const handleSidebarState = () => {
            console.log('clicked')
            setSlidebarState((pre) => {
                if (pre.displayNavNames === "none !important"){
                    return {displayNavNames:''}
                }
                else{
                    return {displayNavNames:'none !important'}
                }

            });
    }
           
    return (
        <Grid className={'slidebarNav'}  container>
            <Box item className={'navIcons'}>
                <Grid><Button onClick={() => handleSidebarState()}><AppsSharpIcon/></Button></Grid>
                <Grid>icon</Grid>
                <Grid>icon</Grid>
            </Box>
            <Box item sx={{display:slidebarState.displayNavNames}} className={'navNames'}>
                <Grid item>
                    <li>
                        nav 1
                    </li>
                </Grid>
                <Grid item>
                    <li>
                        nav 2
                    </li>
                </Grid>
                <Grid item>
                    <li>
                        nav 3
                    </li>
                </Grid>
            </Box>
        </Grid>
        );
}

export default SidebarNavigation;