import dotenv from "dotenv/config";
import axios from "axios";

const paymentAPI = process.env.REACT_APP_PAYMENT_SERVICES_URI + "/stripe";

export const createPaymentIntent = async (req, res) => {
    axios.post(`${paymentAPI}/payment`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}
