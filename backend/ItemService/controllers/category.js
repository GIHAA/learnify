import mongoose from "mongoose";
import Category from "../models/category.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const createCategory = async (req, res) => {
    const category = req.body;
    const newCategory = new Category(category);
    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCategory = async (req, res) => {
    const id = req.params.id;
    const categories = req.body;
    try {
        const category = await Category.findByIdAndUpdate(id, categories);
        res.status(200).json(category);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        await Category.findByIdAndRemove(id);
        res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getOneCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findById(id);
        res.status(200).json(category);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}