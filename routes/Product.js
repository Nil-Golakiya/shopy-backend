const express = require("express");
const {
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
    GetAllProduct,
    GetProductById,
    getProductDetails,
    getuserproductlist
} = require("../controllers/Product.js");


const router = express.Router();

router.get("/", GetAllProduct);
router.get("/productdetails", getProductDetails);
router.get("/categorywiseproduct", getuserproductlist);
router.get("/:id", GetProductById);
router.post("/", CreateProduct);
router.put("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);

module.exports = router;

