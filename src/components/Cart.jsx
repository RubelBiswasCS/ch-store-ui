import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import {useState,useEffect} from 'react';
import axiosInstance from '../Axios';

export default function Cart(props) {
    const [cartItems,setCartItems] = useState({
        loading: true,
        items: [],
    });
    useEffect(() => {
        axiosInstance.get('cart/').then( result => {
            const cartData = result.data;
            setCartItems({
                loading: false,
                items: result.data,
            });
            //console.log("cart content :",cartData);
            if (cartItems.loading === false){
                //console.log("cart content :",cartItems)
            }
            
            
        });
    },[setCartItems]);

    let anchorEl=props.anchorEl;
    let open=props.open;
  return (
    <Box sx={{ width: 500 }}>
      <Popper open={open} anchorEl={anchorEl} placement={'bottom-end'} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{width:{sm:"90vw",md:'15vw'}}}>
              <Typography sx={{ p: 2 }}>This is cart</Typography>
              {cartItems.items.map( item => (
                <Box key={item.product.name}>
                    <Typography>{item.product.name}</Typography>
                    <Typography>{item.quantity}</Typography>
                    <Typography>{item.product.unit_price}</Typography>
                </Box>
              ))}
              
            </Paper>
          </Fade>
        )}
      </Popper>
      
    </Box>
  );
}
