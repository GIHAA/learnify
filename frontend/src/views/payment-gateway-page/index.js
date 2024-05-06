import { useState } from 'react';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import toast from 'react-hot-toast';
import Visa from "./images/visa.jpg"
import Master from "./images/master.jpg"
import Amex from "./images/amex.png"

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
      const { data } = await axios.post(
        'http://localhost:3002/enrollment-service/api/enrollment/create-payment-intent',
        {
          amount: 1099, // Amount in cents
          currency: 'usd',
        }
      );

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div>
            <div className="flex gap-4 mb-8">
              <div className="w-[70px] shadow-md rounded-lg overflow-hidden">
                <img src={Visa} alt="" className="h-[50px]" />
              </div>
              <div className="w-[70px] shadow-md rounded-lg overflow-hidden">
                <img src={Master} alt="" className="h-[50px]" /> 
              </div>
              <div className="w-[70px] shadow-md rounded-lg overflow-hidden">
                <img src={Amex} alt="" className="h-[50px]" />
              </div>

            </div>
          </div>
          <CardElement
            className="border border-gray-300 rounded-lg p-4"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
      >
        Pay
      </button>
    </form>
  );
};

export default PayementGateway;