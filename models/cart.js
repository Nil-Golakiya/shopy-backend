const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        variation_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Variation",
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subVariation:{
            type:Object,
            required:true,
        },
        cart_quantity: {
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true,
    }
)
const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;