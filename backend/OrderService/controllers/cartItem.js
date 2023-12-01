import mongoose from "mongoose";
import CartItem from "../models/cartItem.js";

export const getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const createCartItem = async (req, res) => {
    const cart = req.body;
    const newCartItems = new CartItem(cart);
    try {
        await newCartItems.save();
        res.status(201).json(newCartItems);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCartItem = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const cart = await CartItem.findByIdAndUpdate(id, update);
        res.status(200).json(cart);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteCartItem = async (req, res) => {
    const id = req.params.id;
    try {
        await CartItem.findByIdAndRemove(id);
        res.status(200).json({ message: "Cart Item deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getOneCartItem = async (req, res) => {
    const id = req.params.id;
    try {
        const cart = await CartItem.findById(id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get card by cart id
export const getCartItemsByCartID = async (req, res) => {
    const cartid = req.params.id;
    try {
        const carts = await CartItem.find({ cartID: cartid });
        res.status(200).json(carts);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//recent 9 orders by brand
export const getRecentOrdersByBrand = async (req, res) => {
    const brand = req.params.brand;
    try {
        const carts = await CartItem.find({ itembrand: brand }).sort({ createdAt: -1 }).limit(8);
        res.status(200).json(carts);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}