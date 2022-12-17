const { default: mongoose } = require("mongoose")
const { sendSuccess, sendError } = require("../helpers")
const Product = require("../models/producat")
const Variations = require("../models/variations")


const GetAllProduct = async (req, res) => {
  try {
    const allproduct = await Product.find().populate("subcategory_id", "name")
    return sendSuccess(res, allproduct, "")
  } catch (error) {
    console.log("error", error)
    return sendError(res, error, "")
  }
}

const GetProductById = async (req, res) => {
  try {
    const product = await Product.aggregate(
      [
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
        {
          $lookup: {
            from: "variations",
            localField: "_id",
            foreignField: "product_id",
            as: "variations",
          }
        }
      ]
    );
    return sendSuccess(res, product, "")
  } catch (error) {
    console.log("error", error)
    return sendError(res, error, "")
  }
}

const CreateProduct = async (req, res) => {
  try {
    const data = req.body;
    const variations = data.variations;
    delete data.variations;

    const product = new Product(data);
    const p = await product.save();

    variations.map(async (variation) => {
      variation.product_id = p._id;
      const variationObj = new Variations(variation);
      await variationObj.save();
    })

    res.status(200).json(p)
  } catch (e) {
    console.log(e)
  }
}

const UpdateProduct = async (req, res) => {
  const data = req.body;
  const variations = data.variations;
  delete data.variations;

  const product = await Product.findOneAndUpdate({ _id: req.params.id }, data);

  await Variations.deleteMany({ product_id: req.params.id });

  variations.map(async (variation) => {
    variation.product_id = req.params.id;
    const variationObj = new Variations(variation);
    await variationObj.save();
  })

  res.status(200).json(product)
}

const DeleteProduct = async (req, res) => {
  try {
    await Variations.deleteMany({ product_id: req.params.id });
    const deletedproduct = await Product.findById(req.params.id);
    await deletedproduct.delete()
    res.status(200).json("Your Prodct Has Been Deleted...!")
  } catch (error) {
    console.log(error)
  }
}


module.exports = { CreateProduct, UpdateProduct, DeleteProduct, GetAllProduct, GetProductById }