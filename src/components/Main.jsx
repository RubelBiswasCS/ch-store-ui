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
                items: [...cartData],
            });
            //console.log("cart content :",cartData);
            if (cartItems.loading === false){
                console.log("cart content :",cartItems)
            }
            
            
        });
    }
    },[setCartItems]);

    const handleAddToCart = (e, product, qty) => {

        e.preventDefault();
        let itemExists = false;
        let cart_items = [...cartItems.items]
        //console.log("new cart items", cart_items, 'terger id',product)
        cart_items.find((item, i) => {
            if (item.id === product) {
                // cart_items.splice(i, 1);
                itemExists = true;

            }
        }
        )
        if (itemExists) {
            console.log("item alread in cart")
        }
        else {
            axiosInstance
                .post('cart/', {
                    product: product,
                    quantity: qty,
                })
                .then(result => {
                    const cartData = result.data;
                    console.log("main", cartData, typeof (cartData));
                    setCartItems((prev) => ({
                        ...prev,
                        items: [...prev.items, result.data],
                    }))
                    //console.log("cart content :",cartData);
                    if (cartItems.loading === false) {
                        //console.log("cart content :",cartItems)
                    }


                });
        }


    }
    const handleRemoveCartItem = (e, product) => {
        e.preventDefault();
        axiosInstance
            .delete('cart/' + product + '/')
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
            .then(() => {
                let cart_items = [...cartItems.items]
                //console.log("new cart items", cart_items, 'terger id',product)
                cart_items.find((item, i) => {
                    if (item.id === product) {
                        cart_items.splice(i, 1);

                    }
                }
                )
                setCartItems(state => ({
                    ...state,
                    items: [...cart_items],
                }));
                //console.log('item',cart_items[i].id,i);
                console.log('deleted item');

            });

    }

    return (
        <React.Fragment>
            <Header cartItems={cartItems.items} removeCartItem={handleRemoveCartItem} />
            <Routes>
                <Route path="" element={<Home addToCart={handleAddToCart} appState={appState} />}></Route>
                <Route path="/:id" element={<ProductDetails />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signout" element={<Signout />} />
                <Route path="/testcart" element={<TestCart />} />
            </Routes>
            <Footer />
        </React.Fragment>
    );
};
export default Main;