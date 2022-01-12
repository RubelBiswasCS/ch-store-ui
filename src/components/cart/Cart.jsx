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
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { Link } from "react-router-dom";
import "./Cart.scss";

export default function Cart(props) {
  
    const cartItems = props.cartItems;
    
    let total = 0
    if (cartItems.length > 0){
      total = cartItems.reduce( (pre,current) => (pre+(current.unit_price*current.quantity)),0.0).toFixed(2);
      
    }
    // console.log("total: ",total )
    // console.log(cartItems);
    // console.log(typeof(cartItems));
    let anchorEl=props.anchorEl;
    let open=props.open;
    console.log("open status:",open)
;  return (
   

       
    <Box className={"cart"} sx={{ width: 500 }}>
   
      <Popper open={open} anchorEl={anchorEl} placement={'bottom-end'} transition>
     
      
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={props.handleClickAway}>
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
                          <Button onClick={(e) => props.decrementQty(e,item.id)} sx={{fontSize:"1.2em",maxWidth:"20%",maxHeight:'10%',padding:0,backgroundColor:'pink'}}>-</Button>
                          <Box sx={{width:'30%',display:"flex",justifyContent:"center",alignItems:'center'}}><Typography sx={{fontSize:'1em',textAlign:'center',width:'100%'}}>{item.quantity}</Typography></Box>
                          <Button onClick={(e) => props.incrementQty(e,item.id)} sx={{fontSize:"1.2em",maxWidth:"20%",maxHeight:'10%',padding:0,backgroundColor:'lightblue'}}>+</Button>
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
                {(cartItems.length !== 0)?
                  <Box>
                    <Grid container sp={2} sx={{ display: 'flex', fontSize: '.5em', borderBottom: '1px solid black', justifyContent: 'center', alignItems: 'center', gap: '5px', padding: '2px' }} className={'cartItem'} >
                      <Grid item sx={{ display: 'flex', flexDirection: 'column', width: '55%', justifyContent: 'center', border: "0px solid red" }}>
                        <Box>
                          <Typography sx={{ fontSize: '1em' }}>Sub-total: {total} $</Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                          <Typography sx={{ fontSize: '1em', width: '100%' }}>Shipping: <span>0.00</span> $</Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '1em' }}>Total: {total} $</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: "10px" }}>
                      <Button sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'cyan', padding: '5%', paddingTop: '2%', paddingBottom: '1%', margin: '0', fontSize: '.5em' }} ><Link to="/checkout">Checkout</Link></Button>
                    </Box>
                  </Box>
                :<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', border: "0px solid red",minHeight:'50px' }}>
                  <Typography sx={{ display: 'flex', justifyContent: 'center',alignItems:'center'}}>Cart is empty</Typography>
                </Box>
              }
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
       
        
      </Popper>
      
    </Box>
    

   
  );
}
