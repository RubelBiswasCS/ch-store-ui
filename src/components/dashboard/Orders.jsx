import * as React from 'react';
import OrderContext from '../../Context/OrderContext';
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

            <tr>
                <td>{i}</td>
                <td>{order.full_name}</td>
                <td>{order.city}</td>
                <td>{order.total_paid}</td>
                <td>Pending</td>
                <td><span>View</span></td>
            </tr>

        );
    };
    return (
        <table className={'order-list'}>
            <thead>
                <tr>
                    <th>SL</th>
                    <th>Ordered as</th>
                    <th>Location</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, i) => (<OrderList key={order.order_key} i={i} order={order} />))}
            </tbody>
        </table>
    );
}

export default Orders;