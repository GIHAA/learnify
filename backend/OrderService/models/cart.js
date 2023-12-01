import mongoose from "mongoose";

const Schema = mongoose.Schema;

//get date
let date_ob = new Date();

// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// prints date in YYYY-MM-DD format
let fulldate = year + "-" + month + "-" + date;

console.log(fulldate);

const CartSchema = new Schema({
    buyerID: {
        type: String,
        required: true
    },
    buyerfname: {
        type: String,
        required: true
    },
    buyerlname: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Cart'
    },
    buyeremail: {
        type: String,
        required: true
    },
    buyercontactno: {
        type: String,
        required: true
    },
    placedDate: {
        type: Date,
        default: fulldate
    },
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;