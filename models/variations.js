const mongoose = require('mongoose');

const VariationsSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSchema",
      required: true,
    },
    color: {
      type: 'string',
    },
    subVariation: [{
      size: {
        type: 'string',
      },
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
    }],
    image: {
      type: Array,
    },
  }
)

const variationsSchema = mongoose.model("Variation", VariationsSchema);
module.exports = variationsSchema;