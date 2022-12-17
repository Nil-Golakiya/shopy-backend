const express = require("express");
const multer = require("multer");
const {
  CreateSubCategory,
  UpdateSubcategory,
  DeleteSubCategory,
  GetAllSubCategory
} = require("../controllers/SubCategory.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/SubCategory");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage })

router.get("/getallsubcategory", GetAllSubCategory);
router.post("/", upload.single("file"), CreateSubCategory);
router.put("/:id", upload.single("file"), UpdateSubcategory);
router.delete("/:id", DeleteSubCategory);

module.exports = router;
