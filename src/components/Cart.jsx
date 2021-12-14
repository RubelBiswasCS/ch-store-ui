import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import {useEffect} from 'react';
import axiosInstance from '../Axios';

export default function Cart(props) {
    useEffect(() => {
        axiosInstance.get('cart/').then( result => {
            const cartData = result.data;
            console.log("cart content :",cartData);
            
        });
    },[]);

    let anchorEl=props.anchorEl;
    let open=props.open;
  return (
    <Box sx={{ width: 500 }}>
      <Popper open={open} anchorEl={anchorEl} placement={'bottom-end'} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>This is cart</Typography>
              
            </Paper>
          </Fade>
        )}
      </Popper>
      
    </Box>
  );
}
