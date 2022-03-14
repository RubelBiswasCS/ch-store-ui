import * as React from 'react';
import OrderContext from '../../Context/OrderContext';

import { useParams } from 'react-router-dom';

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
}
    from '@mui/material';

const SingleOrder = () => {
    console.log("single order view")

    const {orders} = React.useContext(OrderContext)
    const { id } = useParams();
    const currentOrder = orders.find(order => order.order_key === id)
    const OrderItems = (props) => {
        
        const item = props.item;
        return (<>
            <div style={{ color: 'black' }} key={item.product.name}>{item.product.name}</div>
        </>)
    }
    return (
        <Grid container>
            <Grid item>
                <div>This is a single order with more details</div>
            </Grid>
            <Grid item>
                {(typeof(currentOrder)=== 'undefined' || !currentOrder)?<div>loading</div>:
                currentOrder.order_items.map(item => (<OrderItems item={item} />))}

            </Grid>
        </Grid>
    );
}

export default SingleOrder;