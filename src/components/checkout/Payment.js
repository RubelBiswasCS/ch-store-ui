import {
    PayPalScriptProvider,
    PayPalButtons,
} from "@paypal/react-paypal-js";
import axiosInstance from '../../Axios';

export default function Payment(props) {
    const {handleSubmit,total} = props;
  return (
    <PayPalScriptProvider options={{ "client-id": "ASbwVOI8tJSImKKIvuVfJgZRUr7t3w8jmGHzhavBNkN1ASeVryMaP8Z7htFPRxKddwghWxGBgKDlg-BV" }}>
        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: total,
                            }
                        }
                    ]
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                    //const name = details.payer.name.given_name;
                    handleSubmit()
                    //console.log(data.orderID)
                    //console.log(details.id)
                    const order_info = {
                        full_name:details.purchase_units[0].shipping.name.full_name,
                        email:details.payer.email_address,
                        address1: details.purchase_units[0].shipping.address.address_line_1,
                        address2: details.purchase_units[0].shipping.address.admin_area_1,
                        city:details.purchase_units[0].shipping.address.admin_area_2,
                        phone:'019333232',
                        postcode:details.purchase_units[0].shipping.address.postal_code,
                        
                        order_key:data.orderID,
                        total_paid: details.purchase_units[0].amount.value,
                        payment_method:'paypal',
                        billing_status:1
                    }
                    axiosInstance
                    .post('placeorder/',order_info)
                    .then(() => {
                        console.log("order created")
                    })
                    console.log('order_details',order_info)
                    console.log("data: ",data)
                    console.log("details: ",details)
                    //total_paid:details[0].amount.value,
                    //alert(`Transaction completed by ${name}`);
                });
            }}
        />
    </PayPalScriptProvider>
   );
}
