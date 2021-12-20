import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
            <Paper sx={{width:{sm:"90vw",md:'20vw'}}}>
              <Typography sx={{ p: 2,display:"flex",justifyContent:"center",borderBottom:"1px solid blue" }}>Cart</Typography>
              {
                cartItems.map( item => (
                  <Grid container sp={2} sx={{display:'flex',fontSize:'.5em',borderBottom:'1px solid black',justifyContent:'center',alignItems:'center',gap:'5px',padding:'2px'}} className={'cartItem'} key={item.name}>
                    <Grid item sx={{width:"20%",justifyContent:'center',padding:'2px'}}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',padding:'0px' }} >
                        <CardMedia
                        component="img"
                        sx={{
                            // 16:9
                            maxHeight:'100%',
                            padding:'5%',
                        }}
                        image="https://source.unsplash.com/random"
                        alt="random"
                        />
                      </Card>
                    </Grid>
                    <Grid item sx={{display:'flex',flexDirection:'column',width:'55%',justifyContent:'center',border:"0px solid red"}}>
                      <Box>
                        <Typography sx={{fontSize:'1em'}}>{item.name}</Typography>
                      </Box>
                      <Box  sx={{display:'flex',justifyContent:'center'}}>
                        <Button sx={{fontSize:"1.2em",maxWidth:"20%",maxHeight:'10%',padding:0,backgroundColor:'pink'}}>-</Button>
                        <Box sx={{width:'30%',display:"flex",justifyContent:"center",alignItems:'center'}}><Typography sx={{fontSize:'1em',textAlign:'center',width:'100%'}}>{item.quantity}</Typography></Box>
                        <Button sx={{fontSize:"1.2em",maxWidth:"20%",maxHeight:'10%',padding:0,backgroundColor:'lightblue'}}>+</Button>
                      </Box>
                    </Grid>
                    <Grid item sx={{display:'flex',width:'20%',justifyContent:'center',alignItems:'center',flexDirection:'column',border:"0px solid red"}}>
                      <Box sx={{display:'flex', flexDirection: 'column', justifyContent:'center',alignItems:'center',padding:"30%",background:'inherit'}}>
                        <Typography sx={{fontSize:'1em'}}>{item.unit_price}</Typography>
                        <Button onClick={ (e) => props.removeCartItem(e,item.id)} sx={{fontSize:".7em",maxWidth:"40%"}}>Remove</Button>
                      </Box>
                      <Box>
  
                      </Box>
                    </Grid>
                      
                  </Grid>
                ))
               }
              
            </Paper>
          </Fade>
        )}
      </Popper>
      
    </Box>
  );
}
