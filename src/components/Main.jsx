import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";

// import axiosInstance from '../Axios';
import axiosInstance from './utils/Axios';
import { useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetails from './product/ProductDetail';
import SignIn from "./auth/signin";
import Signout from "./auth/signout";
import SignUp from "./auth/signup";
import Checkout from "./checkout/Checkout";
import TestCart from "./TestCart";
import Dashboard from "./dashboard/Dashboard";
import DashboardHome from "./dashboard/DashboardHome";
import Orders from "./dashboard/Orders";
import SingleOrder from "./dashboard/SingleOrder";

import OrderContext from "../Context/OrderContext";
const Main = () => {

    const [appState, setAppState] = useState({
        loading: true,
        products: null,
    });

   

    const [cartItems, setCartItems] = useState({
        loading: true,
        items: [],
        total:0,
    });
    const [orders,setOrders] = useState([]);
  
    useEffect(() => {
        let username = localStorage.getItem('username');
        if (username === null){
            username = '';
        }
        //console.log('username: ',username,username.length)
        if(username.length !== 0){
        const orderUrl = "http://localhost:8000/api/getorder";
        axiosInstance.get(orderUrl)
        .then( response => {
            console.log(typeof(response.data))
            return response.data
        })
        .then( result => {
            setOrders([...result])
            console.log("order items: ",result)
        })
        .catch( error => {
            console.log(error);
        })
    }
    },[]);

    useEffect(() => {
        const url = "http://localhost:8000/api/";

        fetch(url)
        .then(response => {
            //console.log(response.json)
            return response.json()})
        .then(result => {
            console.log(result)
            // const allProducts = result.data;
            const allProducts = result;
            console.log(allProducts);
            setAppState({
                loading: false,
                products: allProducts,
            });
        });

    }, [setAppState]);
    
    useEffect(() => {
        let username = localStorage.getItem('username');
        if (username === null){
            username = '';
        }
        //console.log('username: ',username,username.length)
        if(username.length !== 0){
            axiosInstance.get('cart/').then(result => {
                const cartData = result.data;
                
                setCartItems({
                    loading: false,
                    items: [...cartData],
                   
                });
                //console.log("cart content :",cartData)
                //console.log("cart items: ",cartItems)

            });
        }
        
    }, [setCartItems]);
    
    const handleAddToCart = (e, product, qty) => {

        e.preventDefault();

        let cart_items = [...cartItems.items]
        //console.log("new cart items", cart_items, 'terger id',product)
        let index = cart_items.findIndex((item) => (item.id === product));

        if (index === -1) {
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
              
                if (cartItems.loading === false) {
                   
                }
            });

            
        }
        else {
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

    const handleDecrementItem = (e, product) => {
        e.preventDefault();
        let cart_items = [...cartItems.items]
        let index = cart_items.findIndex((item) => (item.id === product));

        if (cart_items[index].quantity > 1) {
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
        else {
            axiosInstance
                .delete('cart/' + product + '/')
                .then(() => {

                    let cart_items = [...cartItems.items]
                    cart_items.splice(index, 1);
                   
                    setCartItems(state => ({
                        ...state,
                        items: [...cart_items],
                    }));
                    console.log('deleted item');

                });
        }

    }

    const handleRemoveCartItem = (e, product) => {
        e.preventDefault();
        let cart_items = [...cartItems.items]
        let index = cart_items.findIndex((item) => (item.id === product));
        if (index !== -1){
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
                cart_items.splice(index, 1);
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
            <OrderContext.Provider value={{orders}}>
            <Routes>
                <Route path="/checkout" element={<Checkout setCartItems={setCartItems}  cartItems={cartItems.items}/>}></Route>
                <Route path="" element={<Home addToCart={handleAddToCart} appState={appState} />}></Route>
                <Route path="/:id" element={<ProductDetails />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signout" element={<Signout />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/testcart" element={<TestCart />} />
               
                <Route path="/dashboard" element={<Dashboard />}>
                   
                        <Route index element={<DashboardHome />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="orders/:id" element={<SingleOrder />} />
                   
                </Route>
            </Routes>  
            </OrderContext.Provider>
          
            
            <Footer />
            
        </React.Fragment>
    );
};
export default Main;