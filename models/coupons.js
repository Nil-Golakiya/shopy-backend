const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        discount: {
            type: Number,
            default: null,
        },
        max_discount_amount: {
            type: Number,
            default: null,
        },
        amount: {
            type: Number,
            default: null,
        },
        min_amount: {
            type: Number,
            required: true,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)
const Coupon = mongoose.model("Coupon", CouponSchema);
module.exports = Coupon;