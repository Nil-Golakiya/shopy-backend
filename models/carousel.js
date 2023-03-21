const mongoose = require('mongoose');

const CarouselSchema = new mongoose.Schema(
    {
        image: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        subcategory_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory"
        },
        status: {
            type: Boolean,
            required: false,
            default: 1
        }
    },
    {
        timestamps: true,
    }
)
const Carousel = mongoose.model("Carousel", CarouselSchema);
module.exports = Carousel;