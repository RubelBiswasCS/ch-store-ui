import * as React from 'react';
import OrderContext from '../../Context/OrderContext';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Link } from "react-router-dom";
import './Orders.scss';



const Orders = () => {
    const {orders} = React.useContext(OrderContext)
    //console.table(orders)
    const OrderList = (props) => {
        const order = props.order;
        const i = props.i
        return (
            // <div  className={'order-list'}>
            //     <span > {order.full_name}</span>
            //     <span > {order.city}</span>
            //     <span > {order.total_paid}</span>
            // </div>

            // <tr>
            //     <td>{i}</td>
            //     <td>{order.full_name}</td>
            //     <td>{order.city}</td>
            //     <td>{order.total_paid}</td>
            //     <td>Pending</td>
            //     <td>View</td>
            // </tr>
            <TableRow
          
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell >{i}</TableCell>
                <TableCell >{order.full_name}</TableCell>
                <TableCell >{order.city}</TableCell>
                <TableCell >{order.total_paid}</TableCell>
                <TableCell >Pending</TableCell>
                <TableCell ><Link to={`${order.order_key}`}>View</Link></TableCell>
            </TableRow>

        );
    };
    return (
        <TableContainer component={Paper}>
            <Table className={'order-list'} >
                <TableHead >
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell >SL</TableCell>
                        <TableCell >Ordered as</TableCell>
                        <TableCell >Location</TableCell>
                        <TableCell >Total</TableCell>
                        <TableCell >Status</TableCell>
                        <TableCell >Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order, i) => (<OrderList key={order.order_key} i={i} order={order} />))}
                </TableBody>
            </Table>
            
        </TableContainer>
        // <table className={'order-list'}>
        //     <thead>
        //         <tr>
        //             <th>SL</th>
        //             <th>Ordered as</th>
        //             <th>Location</th>
        //             <th>Total</th>
        //             <th>Status</th>
        //             <th>Details</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {orders.map((order, i) => (<OrderList key={order.order_key} i={i} order={order} />))}
        //     </tbody>
        // </table>
    );
}

export default Orders;