const mongoose = require('mongoose');

const PaymentFailedSchema = new mongoose.Schema(
    {
        razorpay_order_id: {
            type: String,
            required: true,
        },
        payment_id: {
            type: String,
            required: true,
        },
        payment_method: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
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
            required: false,
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
const PaymentFailed = mongoose.model("PaymentFailed", PaymentFailedSchema);
module.exports = PaymentFailed;