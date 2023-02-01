const express = require("express");
const { GetOrderByUserId, GetOrderByOrderId, GetAllOrder } = require("../controllers/Order");

const router = express.Router();

// router.post("/", CreateCoupon);
router.get("/:id", GetOrderByUserId);
router.get("/orderdetils/:id", GetOrderByOrderId);
router.get("/", GetAllOrder);
// router.get("/:code", GetOneCouponDetails);


module.exports = router;