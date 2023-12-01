import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const Delivery = mongoose.model('Delivery', DeliverySchema);

export default Delivery;