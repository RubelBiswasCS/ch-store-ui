import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import OpenInNewOffRoundedIcon from '@mui/icons-material/OpenInNewOffRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import NotificationAddRoundedIcon from '@mui/icons-material/NotificationAddRounded';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import BuildIcon from '@mui/icons-material/Build';

import Typography from '@mui/material/Typography';

import './Dashboard.scss';

const navLinks = ['Overview','Orders','Messages','Notifications','Profile','Settings','Help'];
const NavItem = ({children}) => {
    return (
        <Grid className={'navItem'}>
            {children}
        </Grid>
    );
}
const NavButton = ({children,...props}) => {
    return (
        <Button className='navButton' {...props}>
            {children}
        </Button>
    );
}
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
                <NavItem >
                    <NavButton onClick={() => handleSidebarState()}>
                        <OpenInNewOffRoundedIcon className='navIcon'/>
                    </NavButton>
                </NavItem>
                <NavItem >
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <GridViewRoundedIcon className='navIcon' color={'error'} />
                    </NavButton>
                </NavItem>
                <NavItem >
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <LocalMallRoundedIcon className='navIcon' color={'error'} />
                    </NavButton>
                </NavItem>
                <NavItem >
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <MessageRoundedIcon className='navIcon' color={'error'} />
                    </NavButton>
                </NavItem>
                <NavItem >
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <NotificationAddRoundedIcon className='navIcon'/>
                    </NavButton>
                </NavItem>
                <NavItem >
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <ManageAccountsRoundedIcon className='navIcon'/>
                    </NavButton>
                </NavItem>
                
                <NavItem >
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <BuildIcon className='navIcon'/>
                    </NavButton>
                </NavItem>
                <NavItem >
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <ContactSupportRoundedIcon className='navIcon'/>
                    </NavButton>
                </NavItem>
                
            </Box>
            <Box item sx={{display:slidebarState.displayNavNames}} className={'navNames'}>
                <NavItem  item>
                    <Typography></Typography>
                </NavItem>
                <NavItem  item><Typography>Overview</Typography> </NavItem>
                <NavItem  item><Typography>Orders</Typography> </NavItem>
                <NavItem  item><Typography>Messages</Typography> </NavItem>
                <NavItem  item><Typography>Notifications</Typography> </NavItem>
                <NavItem  item><Typography>Profile</Typography> </NavItem>
                <NavItem  item><Typography>Settings</Typography> </NavItem>
                <NavItem  item><Typography>Help</Typography> </NavItem>
            
            </Box>
        </Grid>
        );
}

export default SidebarNavigation;