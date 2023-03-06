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
      { $unset: ["sort_description", "long_description", "createdAt", "updatedAt", "__v"] }
    ];

    if (req.query.type) {
      condition.push({
        $match: {
          [req.query.type]: true,
        },
      });
    }
    const allproduct = await Product.aggregate(condition)
    return sendSuccess(res, allproduct, "Product's get successfully")
  } catch (error) {
    return sendError(res, error, "Something went wrong")
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
    return sendSuccess(res, product, "Product get successfully")
  } catch (error) {
    return sendError(res, error, "Something went wrong")
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

    return sendSuccess(res, p, "Product create successfully")
  } catch (e) {
    return sendError(res, e, "Something went wrong")
  }
}

const UpdateProduct = async (req, res) => {
  try {
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
    return sendSuccess(res, product, "Product updated successfully")
  } catch (error) {
    return sendError(res, error, "Something went wrong")
  }
}

const DeleteProduct = async (req, res) => {
  try {
    await Variations.deleteMany({ product_id: req.params.id });
    const deleteProduct = await Product.findById(req.params.id);
    await deleteProduct.delete()
    return sendSuccess(res, deleteProduct, "Product delete successfully")
  } catch (error) {
    return sendError(res, error, "Something went wrong")
  }
}

const getProductDetails = async (req, res) => {
  try {
    const allProductDetails = await Product.aggregate(
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
    return sendSuccess(res, allProductDetails, "Product get successfully")

  } catch (error) {
    return sendError(res, 403, "Something went wrong", error);
  }
}

const getUserProductList = async (req, res) => {
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
    return sendSuccess(res, allProducts, "Get clientSide ProductList successfully")
  } catch (error) {
    console.log(error)
    return sendError(res, 403, "Something went wrong", error);
  }
}

const getLimitedProductList = async (req, res) => {
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

    const allProducts = await Product.aggregate(condition).limit(4);
    return sendSuccess(res, allProducts, "Get clientSide ProductList successfully")
  } catch (error) {
    console.log(error)
    return sendError(res, 403, "Something went wrong", error);
  }
}

module.exports = { CreateProduct, UpdateProduct, DeleteProduct, GetAllProduct, GetProductById, getProductDetails, getUserProductList, getLimitedProductList }