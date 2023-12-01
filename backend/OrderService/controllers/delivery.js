import mongoose from "mongoose";

import Delivery from "../models/delivery.js";

export const getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const createDelivery = async (req, res) => {
    const delivery = req.body;
    const newDelivery = new Delivery(delivery);
    try {
        await newDelivery.save();
        res.status(201).json(newDelivery);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateDelivery = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const delivery = await Delivery.findByIdAndUpdate(id, update);
        res.status(200).json(delivery);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteDelivery = async (req, res) => {
    const id = req.params.id;
    try {
        await Delivery.findByIdAndRemove(id);
        res.status(200).json({ message: "Delivery deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getOneDelivery = async (req, res) => {
    const id = req.params.id;
    try {
        const delivery = await Delivery.findById(id);
        res.status(200).json(delivery);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
