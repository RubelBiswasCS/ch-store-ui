import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import {Link as RRDLink} from "react-router-dom";
import { flexCenter } from './styleJsx/style';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Cart from "./cart/Cart";
import CssBaseline from '@mui/material/CssBaseline';
import './Header.scss';

//const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['profile', 'orders', 'dashboard', 'signout','signin'];
const options = [
      {
        name:'profile',
        url:'profile'
      },
      {
        name:'orders',
        url:'dashboard/orders'
      },
      {
        name:'dashboard',
        url:'dashboard',
      },
     
    ]
const Header = (props) => {

  const {cartItems} = props;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  console.log(anchorElNav);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);


  const handleCartOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) =>  !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
    //console.log("set open fired: ",open)
  };
  const [userData,setUserData] = React.useState([])
  React.useEffect(() => {
    let data = localStorage.getItem('user')
    if(data) {
      setUserData(JSON.parse(data))
    }
  },[setUserData])
  
  console.log("user name on cart loaded",userData.name,userData.is_staff,userData,typeof(userData))
  return (
    <>
  
    <AppBar  className={'app-bar'} position="static">
      <Container maxWidth="xl">
        <Toolbar >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
          <Link style={{...flexCenter}} href="/">
            <Box
              component="img"
              sx={{
                height: '40px',
                width: 'inherit',
          
              }}
              alt="Logo"
              src="https://img.icons8.com/external-inipagistudio-mixed-inipagistudio/64/000000/external-store-bee-and-honey-inipagistudio-mixed-inipagistudio.png"
            />
          </Link>
          </Typography>

         
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },justifyContent:'center' }}
          >
           <Box
            component="img"
            sx={{
              height: '40px',
              width: 'inherit',
        
            }}
            alt="Logo"
            src="https://img.icons8.com/external-inipagistudio-mixed-inipagistudio/64/000000/external-store-bee-and-honey-inipagistudio-mixed-inipagistudio.png"
          />
          </Typography>
         

          <Box sx={{ flexGrow: 0,ml:'auto',display:'flex',alignItems:'center',gap:'15px',cursor:'pointer' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}  sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {(userData !==null && userData.is_staff === false)
              ?
            <Tooltip title="Open Cart">
            <Box sx={{display:'flex'}} onClick={handleCartOpen}>
              <ShoppingCartTwoToneIcon/>
              <Typography variant="caption" sx={{fontSize:'.5em'}}>{cartItems.length}</Typography>
            </Box>
            </Tooltip>
            :null}
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              //add dec 23
              onClick={handleOpenNavMenu}
            >
              {options.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseNavMenu}>
                  
                  
                  <RRDLink to={'/'+setting.url}><Typography textAlign="center">{setting.name.toUpperCase()}</Typography></RRDLink>
                  
               
                </MenuItem>
              ))}
                <MenuItem onClick={handleCloseNavMenu}>
                  {(userData === null || userData.length === 0 || typeof(userData) === undefined)
                  ?<RRDLink to={'/'+'signin'}><Typography textAlign="center">{'signin'.toUpperCase()}</Typography></RRDLink>
                  :<RRDLink to={'/'+"signout"}><Typography textAlign="center">{'logout'.toUpperCase()}</Typography></RRDLink>}
                </MenuItem>
            </Menu>
            
          </Box>
          
          
        </Toolbar>
        <Cart cartItems={props.cartItems} incrementQty={props.incrementQty} decrementQty={props.decrementQty} removeCartItem={props.removeCartItem} anchorEl={anchorEl} open={open} handleClickAway={handleClickAway}/>
        
       
    </Container>
    </AppBar>
    </>
  );
};
export default Header;
