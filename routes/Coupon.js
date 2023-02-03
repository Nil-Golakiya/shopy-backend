const express = require("express");
const { CreateCoupon, GetOneCouponDetails, GetCouponDetails, DeleteCoupon } = require("../controllers/Coupon");

const router = express.Router();

router.post("/", CreateCoupon);
router.get("/", GetCouponDetails);
router.get("/:code", GetOneCouponDetails);
router.delete("/:id", DeleteCoupon);



module.exports = router;