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

import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Cart from "./cart/Cart";

//const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['profile', 'orders', 'dashboard', 'signout'];

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
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
          <Link href="/">
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
         

          <Box sx={{ flexGrow: 0,ml:'auto',display:'flex',gap:'15px' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}  sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Box sx={{display:'flex'}} onClick={handleCartOpen}>
              <ShoppingCartTwoToneIcon/>
              <Typography variant="caption" sx={{fontSize:'.5em'}}>{cartItems.length}</Typography>
              
            </Box>
            
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  
                  <Link href={'/'+setting}><Typography textAlign="center">{setting.toUpperCase()}</Typography></Link>
                  
               
                </MenuItem>
              ))}
            </Menu>
            
          </Box>
          
          
        </Toolbar>
        
        <Cart cartItems={props.cartItems} incrementQty={props.incrementQty} decrementQty={props.decrementQty} removeCartItem={props.removeCartItem} anchorEl={anchorEl} open={open} handleClickAway={handleClickAway}/>
    </Container>
    </AppBar>
    
  );
};
export default Header;
