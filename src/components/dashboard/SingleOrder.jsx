import * as React from 'react';
import OrderContext from '../../Context/OrderContext';

import { useParams } from 'react-router-dom';
import './SingleOrder.scss';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardActions,
    Typography,
    ImageList,
    ImageListItem,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
}
    from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import Paper from '@mui/material/Paper';

const SingleOrder = () => {
    console.log("single order view")

    const {orders} = React.useContext(OrderContext)
    const { id } = useParams();
    const currentOrder = orders.find(order => order.order_key === id)
    const ContentHeading = (props) => {
        return (
            <Typography component={'h3'} className='title'>{props.children}</Typography>
        );
    }
    const LI = (props) => {
        return (
            <ListItem className='ud-content-group'>
                {/* <ListItemText className='attr-name'></ListItemText> */}
                <ListItemText className='attr-value'>{props.children}</ListItemText>
            </ListItem>
           
        );
    }
    const OrderItems = (props) => {
        
        const item = props.item;
        const index = props.i;
        return (<>
            <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell >{index}</TableCell>
                <TableCell >{item.product.name}</TableCell>
                <TableCell >{item.quantity}</TableCell>
                <TableCell >{item.price}</TableCell>
                <TableCell >{item.total_price}</TableCell>
               
            </TableRow>
        </>)
    }

    return (
        <>
        {(typeof(currentOrder)=== 'undefined' || !currentOrder)?<div>loading</div>:
        <Grid container className='single-order'>
             
            <Grid item className='user-details'>
                <ContentHeading>User Details</ContentHeading>
                
                <Grid className='user-details-content'>
                    <List className='udc col-1'>
                        <LI>{currentOrder.full_name}</LI>
                        <Divider />
                        <LI >{currentOrder.email} </LI>
                        <Divider />
                        <LI >{currentOrder.phone} </LI>
                        <Divider light />
                        <LI >{currentOrder.payment_method} </LI>
                    </List>
                    <List className='udc col-2'>
                        <LI >{currentOrder.address1} </LI>
                        <Divider />
                        <LI >{currentOrder.address2} </LI>
                        <Divider />
                        <LI >{currentOrder.city} </LI>
                        <Divider light />
                        <LI >{currentOrder.postcode} </LI>
                    </List>
                </Grid>
            </Grid>
            <Divider/>
            <Grid item className='order-item-list'>
                <ContentHeading>Ordered Items</ContentHeading>
               <TableContainer component={Paper}>
            <Table className={'order-list'} >
                <TableHead >
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell >SL</TableCell>
                        <TableCell >Product</TableCell>
                        <TableCell >Quantity</TableCell>
                        <TableCell >Unit Price</TableCell>
                        <TableCell >Price</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>{currentOrder.order_items.map((item,i) => (<OrderItems i={i} key={item.product.name} item={item} />))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}></TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>{currentOrder.total_price}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            
        </TableContainer>
              

            </Grid>
        </Grid>
    }
</>
    );

}
export default SingleOrder;