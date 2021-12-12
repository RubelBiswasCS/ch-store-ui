import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";

import axiosInstance from '../Axios';
import { useState,useEffect } from "react";


const Main = () => {

    const [appState,setAppState] = useState({
        loading:true,
        post:null,
    });

    useEffect(() => {
        axiosInstance.get().then( result => {
            const allProducts = result.data;
            console.log(allProducts);
        });
    });

    return (
        <React.Fragment>
            <Header/>
            <Home/>
            <Footer/>
        </React.Fragment>
    );
};
export default Main;