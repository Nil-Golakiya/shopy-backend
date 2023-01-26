const express = require("express");
const { CreateCoupon, GetOneCouponDetails, GetCouponDetails } = require("../controllers/Coupon");

const router = express.Router();

router.post("/", CreateCoupon);
router.get("/", GetCouponDetails);
router.get("/:code", GetOneCouponDetails);


module.exports = router;