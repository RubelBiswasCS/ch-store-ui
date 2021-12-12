import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Carousel from './Carousel';
import ProductLoadingComponent from './product/ProductLoading';
import Products from './product/Products';


const ProductLoading = ProductLoadingComponent(Products);

const theme = createTheme();

export default function Home(props) {
  const appState = props.appState;
  console.log("appstate in home ",appState);
  console.log("appstate in home ",appState.products);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 0,
            pb: 2,
            maxHeight:'60%',
          }}
        >
          <Carousel/>
        </Box>
        
      </main>
      <ProductLoading isLoading={appState.loading} products={appState.products}/>

    </ThemeProvider>
  );
}