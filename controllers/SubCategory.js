const SubCategory = require("../models/subcategory")
const Category = require("../models/category")
const fs = require("fs");


const CreateSubCategory = async (req, res) => {
  try {
    const img = req.file.path;
    req.body.image = img;
    const subCategory = await SubCategory.create(req.body);
    await Category.updateOne({ _id: req.body.category_id }, { $push: { subcategory_id: subCategory._id } });
    res.status(200).json("subcategory created successfully")
  } catch (e) {
    console.log(e)
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
    res.status(200).json(UpdateSubcategory);
  } catch (e) {
    console.log(e);
  }
}

const DeleteSubCategory = async (req, res) => {
  try {
    const deletesubcategory = await SubCategory.findById(req.params.id)
    try {
      await deletesubcategory.delete();
      res.status(200).json("Your SubCategory Has Been Deleted...!")
    } catch (e) {
      console.log(e)
    }
  } catch (e) {
    console.log(e)
  }
}

const GetAllSubCategory = async (req, res) => {
  try {
    const allsubcategory = await SubCategory.find().populate("category_id", "name")
    res.status(200).json(allsubcategory)
  } catch (e) {
    console.log(e)
  }
}

module.exports = { CreateSubCategory, UpdateSubcategory, DeleteSubCategory, GetAllSubCategory }