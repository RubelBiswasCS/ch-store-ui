import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { CardMedia } from '@mui/material';

import "./Cart.scss";

export default function Cart(props) {
  
    const cartItems = props.cartItems;
    console.log(cartItems);
    console.log(typeof(cartItems));
    let anchorEl=props.anchorEl;
    let open=props.open;
  return (
    <Box className={"cart"} sx={{ width: 500 }}>
      <Popper open={open} anchorEl={anchorEl} placement={'bottom-end'} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{width:{sm:"90vw",md:'15vw'}}}>
              <Typography sx={{ p: 2 }}>cart</Typography>
              {cartItems.map( item => (
                <Grid container sx={{display:'flex',fontSize:'.5em'}} className={'cartItem'} key={item.name}>
                  <Grid item>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                      <CardMedia
                      component="img"
                      sx={{
                          // 16:9
                          maxHeight:'70%',
                          padding:'5%',
                      }}
                      image="https://source.unsplash.com/random"
                      alt="random"
                      />
                    </Card>
                  </Grid>
                  <Grid item sx={{display:'flex',flexDirection:'column'}}>
                    <Box>
                      <Typography sx={{fontSize:'1em'}}>{item.name}</Typography>
                    </Box>
                    <Box  sx={{display:'flex',justifyContent:'center'}}>
                      <Typography>{item.quantity}</Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                      <Typography>{item.unit_price}</Typography>
                    </Box>
                    <Box>

                    </Box>
                  </Grid>
                    
                </Grid>
              ))}
              
            </Paper>
          </Fade>
        )}
      </Popper>
      
    </Box>
  );
}
