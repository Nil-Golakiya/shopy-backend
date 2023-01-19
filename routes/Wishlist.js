const express = require("express");
const { CreateWishlist, GetWishlist, DeleteWishlist } = require("../controllers/Wishlist");

const router = express.Router();

router.post("/", CreateWishlist);
router.get("/:id", GetWishlist);
router.delete("/:id", DeleteWishlist);

module.exports = router;