import { useState } from 'react';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import toast from 'react-hot-toast';
import Visa from "./images/visa.jpg"
import Master from "./images/master.jpg"
import Amex from "./images/amex.png"
import { createPayment } from 'api/paymentService';
import { createEnrollment } from 'api/enrollment';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PayementGateway = ({ course_id , user_id , price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [, setPaymentIntentId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {

      const data = await createPayment({
        amount: price,
        currency: 'usd',
      });

      setPaymentIntentId(data.data.id);

      const result = await stripe.confirmCardPayment(data.data.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'John Doe',
          },
        },
      });      

      if (result.error) {
        console.error(result.error);
      } else {
        const data = await createEnrollment(
          {
            userId: user_id,
            courseId: course_id,
            stripePaymentIntentId: result.paymentIntent.id,
          }
        );
        navigate('/my-courses')
        toast.success("Enrolled Sucessfully")
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto w-2/3 mx-10">
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

PayementGateway.propTypes = {
  course_id: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default PayementGateway;