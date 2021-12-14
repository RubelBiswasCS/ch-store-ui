import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

export default function Cart(props) {
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
