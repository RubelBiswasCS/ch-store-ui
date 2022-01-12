import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import Review from './Review';
import Payment from './Payment';
import {useState} from 'react';
import axiosInstace from '../../Axios';

const steps = ['Shipping address', 'Review your order','Pay'];

function getStepContent(step, address, products, handleChange, handleSubmit,setCartItems,total) {
  switch (step) {
    case 0:
      return <AddressForm address={address} handleChange={handleChange}/>;
    case 1:
      return <Review products={products} address={address} />;
    case 2:
      return <Payment handleSubmit={handleSubmit} setCartItems={setCartItems} total={total} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout(props) {
  const products = props.cartItems;
  const {setCartItems} = props;
  
  let total = 0
  if (products.length > 0){
    total = products.reduce( (pre,current) => (pre+(current.unit_price*current.quantity)),0.0).toFixed(2);
    
  }
  const [address,setAddress] = useState({
    full_name : "",
    phone : "",
    postcode : "",
    address_line : "", 
    address_line2 : "",
    city : "",
  });
  
  const handleChange = (input) => (e) => {
    setAddress((address) => ({
      ...address,
      [input]: e.target.value,
    }));
    //console.log("address state: ",address);
  } 
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    const data = address;
    axiosInstace
    .post('user/address/',data)
    .then((response) => {
      console.log("response of address post:",response)
      setActiveStep(activeStep + 1);
    })
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep,address, products,handleChange,handleSubmit,setCartItems,total)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? null : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>)}
                  {/* 
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Confirm Payment' : 'Next'}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit(address)}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Confirm Payment
                  </Button>
                  */}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}