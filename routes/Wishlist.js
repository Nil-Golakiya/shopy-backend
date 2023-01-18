const express = require("express");
const { CreateWishlist, GetWishlist } = require("../controllers/Wishlist");

const router = express.Router();

router.post("/", CreateWishlist);
router.get("/", GetWishlist);

module.exports = router;