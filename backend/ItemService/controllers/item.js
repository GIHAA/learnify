import mongoose from "mongoose";
import Item from "../models/item.js";

export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const createItem = async (req, res) => {
    const item = req.body;
    const newItem = new Item(item);
    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateItem = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const item = await Item.findByIdAndUpdate(id, update);
        res.status(200).json(item);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        await Item.findByIdAndRemove(id);
        res.status(200).json({ message: "Item deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getOneItem = async (req, res) => {
    const id = req.params.id;
    try {
        const item = await Item.findById(id);
        res.status(200).json(item);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get new 8 items
export const getNewItems = async (req, res) => {
    try {
        const items = await Item.find().limit(8).sort({ _id: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get random 10 items
export const getRandomItems = async (req, res) => {
    try {
        const items = await Item.aggregate([{ $sample: { size: 10 } }]);
        res.status(200).json(items);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get top 10 rating items
export const getTopRatingItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ rating: -1 }).limit(10);
        res.status(200).json(items);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get new 6 items by sellerID
export const getNewItemsBySeller = async (req, res) => {
    const sellerID = req.params.seller;
    try {
        const items = await Item.find({ sellerID: sellerID }).sort({ _id: -1 }).limit(6);
        res.status(200).json(items);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get all items by sellerID
export const getItemsBySeller = async (req, res) => {
    const sellerID = req.params.seller;
    try {
        const items = await Item.find({ sellerID: sellerID }).sort({ _id: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get all items by category
export const getItemsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const items = await Item.find({ category: category });
        res.status(200).json(items);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get all items by brand
export const getItemsByBrand = async (req, res) => {
    const brand = req.params.brand;
    try {
        const items = await Item.find({ brand: brand });
        res.status(200).json(items);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get items by search
export const getItemsBySearch = async (req, res) => {
    const search = req.params.search;
    try {
        const items = await Item.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        });
        res.status(200).json(items);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}