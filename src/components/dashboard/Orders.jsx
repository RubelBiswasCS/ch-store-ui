import * as React from 'react';
import OrderContext from '../../Context/OrderContext';
const Orders = () => {
    const {orderItems} = React.useContext(OrderContext)
    const OrderList = (props) => {
        const item = props.item;
        return (
            <div className={'order-list'}>
                <span > {item.product.name}</span>
                <span > {item.price}</span>
                <span > {item.quantity}</span>
            </div>
        );
    };
    return (
        <React.Fragment>
            {orderItems.map( item => ( <OrderList item={item}/>))}
           
        </React.Fragment>
    );
}

export default Orders;