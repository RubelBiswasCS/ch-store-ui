import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";

import axiosInstance from '../Axios';
import { useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetails from './product/ProductDetail';
import SignIn from "./auth/signin";
import Signout from "./auth/signout";
import TestCart from "./TestCart";

import { Navigate } from 'react-router-dom';
const Main = () => {

    const [appState,setAppState] = useState({
        loading:true,
        products:null,
    });

    const [cartItems,setCartItems] = useState({
        loading: true,
        items: [],
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

    useEffect(() => {
        if (localStorage.getItem('refresh_token')){
        axiosInstance.get('cart/').then( result => {
            const cartData = result.data;

            setCartItems({
                loading: false,
                items: [...result.data],
            });
            //console.log("cart content :",cartData);
            if (cartItems.loading === false){
                console.log("cart content :",cartItems)
            }
            
            
        });
    }
    },[setCartItems]);

    const handleAddToCart = (e,product,qty) => {
            e.preventDefault();
            axiosInstance
                .post('cart/',{
                    product: product,
                    quantity : qty,
                  })
                .then( result => {
                const cartData = result.data;
                console.log("main" , cartData,typeof(cartData));
                setCartItems((prev) => ({
                    ...prev,
                    items: [...prev.items,result.data],
                }))
                //console.log("cart content :",cartData);
                if (cartItems.loading === false){
                    //console.log("cart content :",cartItems)
                }
                
                
            });
        
    }
    return (
        <React.Fragment>
            <Header cartItems={cartItems.items}/>
            <Routes>
                <Route path="" element={<Home addToCart={handleAddToCart} appState={appState} />}></Route>
                <Route path="/:id" element={<ProductDetails />} />
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signout" element={<Signout/>} />
                <Route path="/testcart" element={<TestCart/>} />
            </Routes>
            <Footer/>
        </React.Fragment>
    );
};
export default Main;