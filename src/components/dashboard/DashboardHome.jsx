import * as React from 'react';
import {
    Outlet
  } from "react-router-dom";

const Dashboard = () => {
    return (

        <React.Fragment>
            <DashboardSidebarNavigation/>
            <Outlet/>
        </React.Fragment>
    );
}
const DashboardSidebarNavigation = () => {
    return (<h1>DashboardSidebarNavigation</h1>);
}

const DashboardHome = () => {
    return (
        <React.Fragment>
            <h3>Dashboard Home</h3>
        </React.Fragment>
    );
}
const Orders = () => {
    return (
        <React.Fragment>
            <h1>Order</h1>
        </React.Fragment>
    );
}

export default DashboardHome;
export {Dashboard, Orders};
