const express = require("express");
const { CreateProduct, UpdateProduct, DeleteProduct, GetAllProduct, GetProductById } = require("../controllers/Product.js");
const multer = require("multer");


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/product");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage })

router.get("/", GetAllProduct);
router.get("/:id", GetProductById);
router.post("/", upload.array("file"), CreateProduct);
router.put("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);

module.exports = router;

