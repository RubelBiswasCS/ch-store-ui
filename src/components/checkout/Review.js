import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review(props) {
  const {products, address} = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={"Quantity: "+product.quantity} />
            <Typography variant="body2">{'$' + product.unit_price*product.quantity}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {"$ "+ products.reduce( (pre, current) => (pre+current.unit_price*current.quantity),0) }
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{address.full_name}</Typography>
          <Typography gutterBottom>{address.address_line+ ", "+ address.address_line2}</Typography>
          <Typography gutterBottom>{address.city+", "+address.postcode}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}