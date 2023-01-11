const express = require("express");
const { CreateCart, GetCartDetails, DeleteCart, UpdateCart } = require("../controllers/Cart");

const router = express.Router();

router.post("/", CreateCart);
router.get("/:id", GetCartDetails);
router.delete("/:id", DeleteCart);
router.put("/:id", UpdateCart);


module.exports = router;