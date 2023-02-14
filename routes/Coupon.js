const express = require("express");
const { CreateCoupon, GetOneCouponDetails, GetCouponDetails, DeleteCoupon, UpdateCoupon } = require("../controllers/Coupon");

const router = express.Router();

router.post("/", CreateCoupon);
router.get("/", GetCouponDetails);
router.get("/:code", GetOneCouponDetails);
router.put("/:code", UpdateCoupon);
router.delete("/:id", DeleteCoupon);



module.exports = router;