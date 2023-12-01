import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2'

import './CardPayment.css'
import PayServices from '../../services/payment.service'
import CartService from "../../services/cart.service";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        if (!error) {
            try {
                const { id } = paymentMethod
                const data = {
                    amount: Number(sessionStorage.getItem("total")) * 100,
                    id
                }
                const response = await PayServices.pay(data);
                if (response.data.success) {
                    console.log("Successful payment")
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful',
                        text: 'Your order is placed now. Wait for 2 to 4 business days to approve the order!!',
                        footer: '<a href="/buyerProfile">View Your Orders</a>'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            const update = {
                                status: "Pending",
                                totalPrice: Number(sessionStorage.getItem("total"))
                            }
                            CartService.update(sessionStorage.getItem("cart-id"), update).then((res) => {
                                console.log(res);
                            }).catch((err) => {
                                console.log(err);
                            });

                            CartService.update(sessionStorage.getItem("cart-id"), update).then((res) => {
                                console.log(res);
                            }).catch((err) => {
                                console.log(err);
                            });

                            const cart = {
                                buyerID: sessionStorage.getItem("user-id"),
                                buyerfname: sessionStorage.getItem("fname"),
                                buyerlname: sessionStorage.getItem("lname"),
                                buyeremail: sessionStorage.getItem("email"),
                                buyercontactno: sessionStorage.getItem("contactNo"),
                            }
                            CartService.create(cart).then((res) => {
                                console.log(res);
                                console.log(res.data._id);
                                sessionStorage.setItem("cart-id", res.data._id);
                                window.location.href = "/buyerProfile";
                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                    })
                }

            } catch (error) {
                console.log("Error", error)
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Failed',
                    text: 'Please Check The Payment Details'
                })
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className="payContainer">
                <Alert key='success' variant='success'>
                    Beheth Kade Payment Gateway
                </Alert>
                <Alert key='dark' variant='dark'>
                    Pay - Rs. {sessionStorage.getItem("total")}
                </Alert>
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroupPay">
                        <div className="FormRowPay">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button className="pay">Pay</button>
                </form>
            </div>
        </>
    )
}
