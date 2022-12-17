const mongoose = require('mongoose');

const SubCategorySchema =new mongoose.Schema(
  {
    category_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category",
      required:true,
    },
    name:{
      type: 'string',
      required: true,
    },
    status:{
      type: 'boolean',
      required: true,
      default:0
    },
    image:{
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
module.exports =SubCategory;