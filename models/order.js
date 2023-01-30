const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        order_id: {
            type: String,
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        order_details_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OrderDetails",
            },
        ],
        status: {
            type: String,
            required: false,
            default: "Initiated"
        },
        date: {
            type: Date,
            required: false,
        },
        paymentInfo: {
            type: String,
            default: ""
        },
        total_price: {
            type: Number,
            required: true,
        },
        discount: {
            code: { type: String, default: null },
            amount: { type: Number, default: 0 },
        },
        contact_info: {
            email: { type: String },
            phone_no: { type: Number },
        },
        shipping_info: {
            first_name: { type: String },
            last_name: { type: String },
            phone_no: { type: Number },
            address_1: { type: String },
            address_2: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            pin_code: { type: Number },
        },
    },
    {
        timestamps: true,
    }
)
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;