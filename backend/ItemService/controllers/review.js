import mongoose from "mongoose";
import Review from "../models/review.js";

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const createReview = async (req, res) => {
    const review = req.body;
    const newReview = new Review(review);
    try {
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateReview = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const review = await Review.findByIdAndUpdate(id, update);
        res.status(200).json(review);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteReview = async (req, res) => {
    const id = req.params.id;
    try {
        await Review.findByIdAndRemove(id);
        res.status(200).json({ message: "Review deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getOneReview = async (req, res) => {
    const id = req.params.id;
    try {
        const review = await Review.findById(id);
        res.status(200).json(review);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get reviews by itemID
export const getReviewsByItem = async (req, res) => {
    const id = req.params.id;
    try {
        const reviews = await Review.find({ itemID: id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get reviews by userID
export const getReviewsByUser = async (req, res) => {
    const id = req.params.id;
    try {
        const reviews = await Review.find({ buyerID: id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
