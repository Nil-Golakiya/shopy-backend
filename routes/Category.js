const express = require("express");
const { CreateCategory, GetAllCategory, UpdateCategory, DeleteCategory } = require("../controllers/Category.js");
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/category");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage })

router.get("/allcategory", GetAllCategory);
router.post("/", upload.single("file"), CreateCategory);
router.put("/:id", upload.single("file"), UpdateCategory);
router.delete("/:id", DeleteCategory);


module.exports = router;