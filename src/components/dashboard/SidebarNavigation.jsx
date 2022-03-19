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
import {Link as RRDLink} from "react-router-dom";
import {useNavigate} from 'react-router-dom';


import './Dashboard.scss';


const navLinks = ['Overview','Orders','Messages','Notifications','Profile','Settings','Help'];
const NavItem = ({children}) => {
    return (
        <Grid className={'nav-item'}>
            {children}
        </Grid>
    );
}
const NavButton = ({children,...props}) => {
    return (
        <Button className='nav-button' {...props}>
            {children}
        </Button>
    );
}
const BtnIcon = (props) => {
    return (
        <div className='btn-icon'>{props.children}</div>
    );
}
const BtnText = (props) => {
    //console.log(props.display)
    return (
        <div className='btn-text' style={{...props.display}}>{props.children}</div>
    );
}
const SidebarNavigation = () => {
    const [display, setDisplay] = React.useState({
        display:'',
    });
    const navigate = useNavigate();
    const handleDisplay = (e) => {
            e.preventDefault();
            console.log('just clicked')
            //console.log('display: ',display.display)
            setDisplay((pre) => {
                //console.log(pre)
                if (pre.display === "none"){
                    return {display:''}
                }
                else{
                    return {display:'none'}
                }

            });
    }
 
    return (
        <Grid className={'slidebarNav'}  container>
                    
            <Box item className={'nav-list'}>
                    <NavButton onClick={handleDisplay}>
                        <BtnIcon><OpenInNewOffRoundedIcon /></BtnIcon>
                        <BtnText display={display}></BtnText>
                    </NavButton>

                    <NavButton onClick={() => {console.log("clicked")}}>
                        <BtnIcon><GridViewRoundedIcon  /></BtnIcon>
                        <BtnText display={display}><Typography>Overview</Typography></BtnText>
                    </NavButton>

                    <NavButton onClick={() => {navigate('/dashboard/orders')}}>
                        <BtnIcon><LocalMallRoundedIcon  /></BtnIcon>
                        <BtnText display={display}><Typography>Orders</Typography></BtnText>
                    </NavButton>
                     
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <BtnIcon><MessageRoundedIcon className='navIcon'  /></BtnIcon>
                        <BtnText display={display}><Typography>Messages</Typography></BtnText>
                    </NavButton>
                
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <BtnIcon><NotificationAddRoundedIcon className='navIcon'/></BtnIcon>
                        <BtnText display={display}><Typography>Notifications</Typography></BtnText>
                    </NavButton>
                
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <BtnIcon><ManageAccountsRoundedIcon className='navIcon'/></BtnIcon>
                        <BtnText display={display}><Typography>Profile</Typography></BtnText>
                    </NavButton>
                
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <BtnIcon><BuildIcon className='navIcon'/></BtnIcon>
                        <BtnText display={display}><Typography>Settings</Typography></BtnText>
                    </NavButton>
                
                    <NavButton onClick={() => {console.log("clicked")}}>
                        <BtnIcon><ContactSupportRoundedIcon /></BtnIcon>
                        <BtnText display={display}><Typography>Help</Typography></BtnText>
                    </NavButton>
                
            </Box>
            {/* <Box item sx={{display:slidebarState.displayNavNames}} className={'navNames'}>
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
            
            </Box> */}
        </Grid>
        );
}

export default SidebarNavigation;