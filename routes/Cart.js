const express = require("express");
const { CreateCart, GetCartDetails, DeleteCart } = require("../controllers/Cart");

const router = express.Router();

router.post("/", CreateCart);
router.get("/:id", GetCartDetails);
router.delete("/:id", DeleteCart);


module.exports = router;