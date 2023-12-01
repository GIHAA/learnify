const StripeKey = process.env.STRIPE_SECRET_KEY;
import Stripe from 'stripe';
const stripe = new Stripe(StripeKey);

export const createPaymentIntent = async (req, res) => {
    let { amount, id } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "LKR",
            description: "Beheth Kade Pay",
            payment_method: id,
            confirm: true
        })
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
}
