import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

import {
	Navbar,
  } from "../../components";

const PUBLIC_KEY = "pk_test_51Mz4yYDC8iUflflhhDSZV8ZI3FWHrwkTpJYHQNqDPj169XY2VphykPHgXfNd8HTQFzf9mx3IHGTNio6W5Xl5spwv00tBPWsJAV"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<>
		<Navbar/>
		<br/><br/><br/><br/>
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
		</>
	)
}
