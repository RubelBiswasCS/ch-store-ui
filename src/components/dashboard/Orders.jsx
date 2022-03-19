import * as React from 'react';
import OrderContext from '../../Context/OrderContext';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { Link } from "react-router-dom";
import './Orders.scss';



const Orders = () => {
    const {orders} = React.useContext(OrderContext)
    //console.table(orders)
    const [page,setPage] = React.useState(0);
    const [rowsPerPage,setRowsPerPage] = React.useState(5);
    const handleChangePage = (event,newPage) => {
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value,10));
        setPage(0);
    };
    
    const emptyRows = rowsPerPage - Math.min(
        rowsPerPage, orders.length - page * rowsPerPage
        );

    const OrderList = (props) => {
        const order = props.order;
        const index = props.index
        return (
        
            <TableRow
          
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell >{index}</TableCell>
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
                    {orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order, i) => (<OrderList key={order.order_key} index={(page * rowsPerPage)+i+1} order={order} />))}

                {emptyRows > 0 && (
                            <TableRow style={{ height: 72 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={orders.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
  
    );
}

export default Orders;