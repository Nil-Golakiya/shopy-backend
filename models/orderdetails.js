const mongoose = require('mongoose');

const OrderDetailsSchema = new mongoose.Schema(
    {
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        product_info: {
            type: Object,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: false,
        },
        total: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
const OrderDetails = mongoose.model("OrderDetails", OrderDetailsSchema);
module.exports = OrderDetails;