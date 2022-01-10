import {
    PayPalScriptProvider,
    PayPalButtons,
} from "@paypal/react-paypal-js";

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
                    //alert(`Transaction completed by ${name}`);
                });
            }}
        />
    </PayPalScriptProvider>
   );
}
