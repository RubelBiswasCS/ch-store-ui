import * as React from 'react';
import OrderContext from '../../Context/OrderContext';
const Orders = () => {
    const {orderItems} = React.useContext(OrderContext)
    return (
        <React.Fragment>
            {orderItems.map( items => ( <h1>Order: {items.price}</h1>))}
           
        </React.Fragment>
    );
}

export default Orders;