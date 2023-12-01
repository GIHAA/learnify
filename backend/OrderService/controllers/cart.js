import Cart from "../models/cart.js";
import nodemailer from 'nodemailer';
import axios from 'axios';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

export const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const createCart = async (req, res) => {
    const cart = req.body;
    const newCart = new Cart(cart);
    try {
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCart = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const cart = await Cart.findByIdAndUpdate(id, update);
        res.status(200).json(cart);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

    const cart = await Cart.findById(id);
    const email = cart.buyeremail;
    const status = cart.status;
    const contactNo = cart.buyercontactno;

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: `Order ${status}`,
        html: `Your Order (${id}) is ${status} now!!`,
    });

    axios.post(`https://app.notify.lk/api/v1/send`, {
        user_id: process.env.USER_ID,
        api_key: process.env.API_KEY,
        sender_id: "NotifyDEMO",
        to: contactNo,
        message: `Your Order (${id}) is ${status} now!!`
    })
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        }
        );
}

export const deleteCart = async (req, res) => {
    const id = req.params.id;
    try {
        await Cart.findByIdAndRemove(id);
        res.status(200).json({ message: "Cart deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getOneCart = async (req, res) => {
    const id = req.params.id;
    try {
        const cart = await Cart.findById(id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get carts by buyerID
export const getCartsByBuyerID = async (req, res) => {
    const buyerid = req.params.id;
    try {
        const carts = await Cart.find({ buyerID: buyerid });
        res.status(200).json(carts);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get carts with pending status
export const getCartsByStatus = async (req, res) => {
    const status = req.params.status;
    try {
        const carts = await Cart.find({ status: status });
        res.status(200).json(carts);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get carts with that the status is not delivered by buyerID
export const getCartsByBuyerIDAndNotDelivered = async (req, res) => {
    const buyerid = req.params.id;
    try {
        const carts = await Cart.find({ buyerID: buyerid, status: { $nin: ["Delivered", "Cart"] } });
        res.status(200).json(carts);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get carts with status delivered by buyerID
export const getCartsByBuyerIDAndDelivered = async (req, res) => {
    const buyerid = req.params.id;
    try {
        const carts = await Cart.find({ buyerID: buyerid, status: "Delivered" });
        res.status(200).json(carts);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
