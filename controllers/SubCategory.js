const SubCategory = require("../models/subcategory")
const Category = require("../models/category")
const fs = require("fs");
const { sendSuccess, sendError } = require("../helpers")


const CreateSubCategory = async (req, res) => {
  try {
    const img = req.file.path;
    req.body.image = img;
    const subCategory = await SubCategory.create(req.body);
    await Category.updateOne({ _id: req.body.category_id }, { $push: { subcategory_id: subCategory._id } });
    return sendSuccess(res, subCategory, "SubCategory created successfully")
  } catch (e) {
    return sendError(res, 403, "Something went wrong", e);
  }
}

const UpdateSubcategory = async (req, res) => {
  try {
    if (req.body.image) {
      await fs.unlinkSync(req.body.image);
    }

    if (req.file) {
      const newImg = req.file.path;
      req.body.image = newImg;
    }
    const UpdateSubcategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return sendSuccess(res, UpdateSubcategory, "SubCategory updated successfully")
  } catch (e) {
    return sendError(res, 403, "Something went wrong", e);
  }
}

const DeleteSubCategory = async (req, res) => {
  try {
    const DeleteSubcategory = await SubCategory.findById(req.params.id)
    try {
      await Category.updateOne({ _id: DeleteSubcategory.category_id }, { $pop: { subcategory_id: DeleteSubcategory._id } });
      await DeleteSubcategory.delete();
      return sendSuccess(res, DeleteSubcategory, "SubCategory deleted successfully")
    } catch (e) {
      return sendError(res, 403, "Something went wrong", e);
    }
  } catch (e) {
    return sendError(res, 403, "Something went wrong", e);
  }
}

const GetAllSubCategory = async (req, res) => {
  try {
    const condition = {}
    if (req.query && req.query.category) {
      condition.category_id = req.query.category
    }
    const allSubcategory = await SubCategory.find(condition).populate("category_id", "name")
    return sendSuccess(res, allSubcategory, "SubCategory's get successfully")
  } catch (e) {
    return sendError(res, 403, "Something went wrong", e);
  }
}

module.exports = { CreateSubCategory, UpdateSubcategory, DeleteSubCategory, GetAllSubCategory }