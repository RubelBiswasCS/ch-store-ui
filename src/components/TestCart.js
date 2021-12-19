import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import axiosInstance from '../Axios';
import {useEffect} from 'react';

const theme = createTheme();





export default function TestCart() {

    useEffect( () => {
      axiosInstance
        .patch(`cart/129/`, {
          product: 3,
        })
        .then((res) => {

          console.log(res);
        //console.log(res.data);
      })
    },[]);
    


  return (
    <ThemeProvider theme={theme}>
      <p>
        posted
      </p>
    </ThemeProvider>
  );
}