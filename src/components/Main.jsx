import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";

import axiosInstance from '../Axios';
import { useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetails from './product/ProductDetail';

const Main = () => {

    const [appState,setAppState] = useState({
        loading:true,
        products:null,
    });

    useEffect(() => {
        axiosInstance.get().then( result => {
            const allProducts = result.data;
            console.log(allProducts);
            setAppState({
                loading:false,
                products:allProducts,
            });
        });
    },[setAppState]);

    return (
        <React.Fragment>
            <Header/>
            <Routes>
                <Route path="" element={<Home appState={appState} />}></Route>
                <Route path="/:id" element={<ProductDetails />} />
            </Routes>
            <Footer/>
        </React.Fragment>
    );
};
export default Main;