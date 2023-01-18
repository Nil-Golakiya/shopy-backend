const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
const Wishlist = mongoose.model("wishlist", WishlistSchema);
module.exports = Wishlist;