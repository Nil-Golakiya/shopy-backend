const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    img: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    status: {
      type: 'boolean',
      required: true,
      default: 0
    },
  },
  {
    timestamps: true,
  }
)
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;