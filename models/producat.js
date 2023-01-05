const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory"
    },
    category_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category",
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
    status: {
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
    images: {
      type:Array,
      // required: true,
    }
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.model("Product", ProductSchema);
module.exports = productSchema;