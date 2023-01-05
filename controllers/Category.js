const Category = require("../models/category");
const { sendError, sendSuccess } = require("../helpers/index")
const fs = require("fs");

const CreateCategory = async (req, res,) => {
  try {
    const img = req.file.path;
    req.body.img = img;
    const newcategory = new Category(req.body);
    const savecategory = await newcategory.save();
    res.status(200).json(savecategory)
  } catch (e) {
    console.log(e)
  }
}

const GetAllCategory = async function (req, res) {
  try {
    const allcategory = await Category.find()
    res.status(200).json(allcategory)
  } catch (e) {
    console.log(e)
  }
}

const UpdateCategory = async (req, res) => {
  try {
    if (req.body.img) {
      await fs.unlinkSync(req.body.img);
    }

    if (req.file) {
      const newImg = req.file.path;
      req.body.img = newImg;
    }
    const UpdatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(UpdatedCategory);
  } catch (e) {
    console.log(e)
  }
}

const DeleteCategory = async (req, res) => {
  try {
    const deleteCategory = await Category.findById(req.params.id)
    try {
      await deleteCategory.delete()
      res.status(200).json("Your Category Has Been Deleted...!")
    } catch (e) {
      console.log(e)
    }
  } catch (e) {
    console.log(e)
  }
}

const GetCustomerCategory = async (req, res) => {
  try {
    const allcategory = await Category.aggregate(
      [
        {
          $lookup: {
            from: "subcategories",
            localField: "_id",
            foreignField: "category_id",
            as: "subcategory_details",
          }
        }
      ]
    );
    res.status(200).json(allcategory)
  } catch (error) {
    return sendError(res, 403, "Something went wrong", err);
  }
}



module.exports = { CreateCategory, GetAllCategory, UpdateCategory, DeleteCategory, GetCustomerCategory }