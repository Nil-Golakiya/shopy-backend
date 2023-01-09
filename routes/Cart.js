const express = require("express");
const { CreateCart, GetCartDetails } = require("../controllers/Cart");

const router = express.Router();

router.post("/", CreateCart);
router.get("/", GetCartDetails);


module.exports = router;