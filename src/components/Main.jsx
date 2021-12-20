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

    const [appState, setAppState] = useState({
        loading: true,
        products: null,
    });

    const [cartItems, setCartItems] = useState({
        loading: true,
        items: [],
    });

    useEffect(() => {

        axiosInstance.get().then(result => {
            const allProducts = result.data;
            console.log(allProducts);
            setAppState({
                loading: false,
                products: allProducts,
            });
        });

    }, [setAppState]);

    useEffect(() => {
        if (localStorage.getItem('refresh_token')) {
            axiosInstance.get('cart/').then(result => {
                const cartData = result.data;

                setCartItems({
                    loading: false,
                    items: [...cartData],
                });
                //console.log("cart content :",cartData);
                if (cartItems.loading === false) {
                    //console.log("cart content :",cartItems)
                }


            });
        }
    }, [setCartItems]);

    const handleAddToCart = (e, product, qty) => {

        e.preventDefault();
        let cart_items = [...cartItems.items]
        //console.log("new cart items", cart_items, 'terger id',product)
        let index = cart_items.findIndex((item) => (item.id === product));

        if (index != -1) {
            // console.log("index ",typeof(index))
            // console.log("all cart items",cart_items[index].id)
            let updated_qty = cart_items[index].quantity + 1

            console.log("item alread in cart")
            axiosInstance
                .patch('cart/' + product + "/", {
                    quantity: updated_qty
                })
                .then(result => {
                    console.log("patch result", result.data)
                    cart_items[index].quantity = result.data.quantity

                    setCartItems((prev) => ({
                        ...prev,
                        items: [...cart_items]
                    }))
                })
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
    const handleIncrementItem = (e,product) => {
        e.preventDefault();
        let cart_items = [...cartItems.items]
        let index = cart_items.findIndex((item) => (item.id === product));
        let updated_qty = cart_items[index].quantity + 1

        axiosInstance
            .patch('cart/' + product + "/", {
                quantity: updated_qty
            })
            .then(result => {
                console.log("patch result", result.data)
                cart_items[index].quantity = result.data.quantity

                setCartItems((prev) => ({
                    ...prev,
                    items: [...cart_items]
                }))
            })
    }

    const handleDecrementItem = (e,product) => {
        e.preventDefault();
        let cart_items = [...cartItems.items]
        let index = cart_items.findIndex((item) => (item.id === product));
        
        if ( cart_items[index].quantity > 0 ) {
            let updated_qty = cart_items[index].quantity - 1

            axiosInstance
                .patch('cart/' + product + "/", {
                    quantity: updated_qty
                })
                .then(result => {
                    console.log("patch result", result.data)
                    cart_items[index].quantity = result.data.quantity

                    setCartItems((prev) => ({
                        ...prev,
                        items: [...cart_items]
                    }))
                })
            }
        
    }

    const handleRemoveCartItem = (e, product) => {
        e.preventDefault();
        if (cartItems != []){
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
        
    }

    return (
        <React.Fragment>
            <Header cartItems={cartItems.items} removeCartItem={handleRemoveCartItem} decrementQty={handleDecrementItem} incrementQty={handleIncrementItem}/>
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