const express = require("express");
const { CreateProduct, UpdateProduct, DeleteProduct, GetAllProduct, GetProductById } = require("../controllers/Product.js");

const router = express.Router();

router.get("/", GetAllProduct);
router.get("/:id", GetProductById);
router.post("/", CreateProduct);
router.put("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);

module.exports = router;

