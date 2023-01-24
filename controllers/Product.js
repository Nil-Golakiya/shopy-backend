const { default: mongoose, connection } = require("mongoose")
const { sendSuccess, sendError } = require("../helpers")
const Category = require("../models/category")
const Product = require("../models/producat")
const Variations = require("../models/variations")


const GetAllProduct = async (req, res) => {
  try {
    const condition = [
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "categories",
          pipeline: [{
            $project: { name: 1 }
          }],
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory_id",
          foreignField: "_id",
          as: "subcategories",
          pipeline: [{
            $project: { name: 1 }
          }],
        },
      },
      {
        $lookup: {
          from: "variations",
          localField: "_id",
          foreignField: "product_id",
          as: "variations",
          pipeline: [{
            $project: {
              color: 1,
              image: 1,
              'subVariation.size': 1,
              'subVariation.price': 1,
              'subVariation.discount': 1,
            }
          }],
        }
      },
      { $unset: ["sort_description", "long_description", "status", "createdAt", "updatedAt", "__v"] }
    ];

    if (req.query.type) {
      condition.push({
        $match: {
          [req.query.type]: true,
        },
      });
    }

    console.log("condition", condition)

    const allproduct = await Product.aggregate(condition)
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
    const files = [];
    console.log("req.files",req.files)
    console.log("req.file",req.file)
    req.files.map((file) => {
      files.push(file.path);
      return file;
    })
    const data = req.body;
    console.log('#####', data);
    data.images = files;
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

const getProductDetails = async (req, res) => {
  try {
    const allproductdetails = await Product.aggregate(
      [
        {
          $lookup: {
            from: "variations",
            localField: "_id",
            foreignField: "product_id",
            as: "product_details",
          }
        }
      ]
    );
    res.status(200).json(allproductdetails)
  } catch (error) {
    return sendError(res, 403, "Something went wrong", error);
  }
}

const getuserproductlist = async (req, res) => {
  try {
    const condition = [
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "categories",
          pipeline: [{
            $project: { name: 1 }
          }],
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory_id",
          foreignField: "_id",
          as: "subcategories",
          pipeline: [{
            $project: { name: 1 }
          }],
        },
      },
      {
        $lookup: {
          from: "variations",
          localField: "_id",
          foreignField: "product_id",
          as: "variations",
          pipeline: [{
            $project: {
              color: 1,
              image: 1,
              'subVariation.size': 1,
              'subVariation.price': 1,
              'subVariation.discount': 1,
            }
          }],
        }
      },
      { $unset: ["sort_description", "long_description", "status", "featured", "tranding", "createdAt", "updatedAt", "__v"] }
    ];

    if (!req.query.subcategory_id && req.query.category_id) {
      condition.push({
        $match: {
          "categories.name": req.query.category_id,
        },
      });
    }

    if (req.query.subcategory_id) {
      condition.push({
        $match: {
          "categories.name": req.query.category_id,
          "subcategories.name": req.query.subcategory_id,
        },
      });
    }

    const allProducts = await Product.aggregate(condition);

    res.status(200).json(allProducts)
  } catch (error) {
    console.log(error)
    return sendError(res, 403, "Something went wrong", error);
  }
}


module.exports = { CreateProduct, UpdateProduct, DeleteProduct, GetAllProduct, GetProductById, getProductDetails, getuserproductlist }