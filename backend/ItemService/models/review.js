import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    buyerFname: {
        type: String,
        required: true
    },
    buyerLname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    itemID: {
        type: String,
        required: true
    },
    buyerID: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;