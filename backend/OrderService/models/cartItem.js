import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    cartID: {
        type: String,
        required: true
    },
    itemID: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itembrand: {
        type: String,
        required: true
    },
    itemimage: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const CartItem = mongoose.model("CartItem", CartItemSchema)

export default CartItem;