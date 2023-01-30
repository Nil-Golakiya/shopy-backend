const express = require("express");
const {GetOrderByUserId} = require("../controllers/Order");

const router = express.Router();

// router.post("/", CreateCoupon);
router.get("/:id", GetOrderByUserId);
// router.get("/:code", GetOneCouponDetails);


module.exports = router;