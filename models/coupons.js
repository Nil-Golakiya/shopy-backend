const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema(
    {
        coupon_code: {
            type: String,
            required: true,
        },
        coupon_description: {
            type: String,
            required: true,
        },
        coupon_uses: {
            type: String,
            required: true,
        },
        coupon_status: {
            type: Boolean,
            required: true,
        },
        coupon_max_uses: {
            type: Number,
            required: true,
        },
        coupon_max_uses_user: {
            type: Number,
            required: true,
        },
        coupon_discount_amt: {
            type: Number,
            required: true,
        },
        coupon_min_order_amt: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
const Coupon = mongoose.model("Coupon", CouponSchema);
module.exports = Coupon;