const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
    {
        razorpay_order_id: {
            type: String,
            default: null,
        },
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            default: null,
        },
        razorpay_payment_id: {
            type: String,
            required: true,
        },
        payment_method: {
            type: String,
            required: false,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: null,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        user: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        meta: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;