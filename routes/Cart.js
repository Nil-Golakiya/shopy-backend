const express = require("express");
const { CreateCart, GetCartDetails, DeleteCart, UpdateCart, ClearCart } = require("../controllers/Cart");

const router = express.Router();

router.post("/", CreateCart);
router.get("/:id", GetCartDetails);
router.delete("/:id", DeleteCart);
router.put("/:id", UpdateCart);
router.delete("/deltemany/:id", ClearCart);


module.exports = router;