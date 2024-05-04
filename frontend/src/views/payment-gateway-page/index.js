import  { useState } from 'react';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import toast from 'react-hot-toast';

// ==============================|| SAMPLE PAGE ||============================== //

const PayementGateway = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [, setPaymentIntentId] = useState(null);

const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    try {
      // Create a payment intent on the server
      const { data } = await axios.post('http://localhost:3002/enrollment-service/api/enrollment/create-payment-intent', {
        amount: 1099, // Amount in cents
        currency: 'usd',
      });

      setPaymentIntentId(data.data.id);

      // Confirm the payment with Stripe
      const result = await stripe.confirmCardPayment(data.data.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'John Doe',
          },
        },
      });

      if (result.error) {
        // Handle payment error
        console.error(result.error);
      } else {

        toast.success('Payment successful');

        // to make a service for this 
        await axios.post('/api/enrollments', {
          userId: 'user_id',
          courseId: 'course_id',
          stripePaymentIntentId: data.paymentIntentId,
          // other enrollment data
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};
export default PayementGateway;
