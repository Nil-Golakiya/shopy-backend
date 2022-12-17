const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory"
    },
    title: {
      type: 'string',
      required: true,
    },
    sort_description: {
      type: 'string',
      required: true,
    },
    long_description: {
      type: 'string',
      required: true,
    },
    staus: {
      type: 'boolean',
      required: true,
      default: 0
    },
    featured: {
      type: 'boolean',
      required: true,
      default: 0
    },
    tranding: {
      type: 'boolean',
      required: true,
      default: 0
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.model("Product", ProductSchema);
module.exports = productSchema;