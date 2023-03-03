const express = require("express");
const { GetOrderByUserId, GetOrderByOrderId, GetAllOrder, GetLimitedOrder } = require("../controllers/Order");

const router = express.Router();

router.get("/:id", GetOrderByUserId);
router.get("/orderdetils/:id", GetOrderByOrderId);
router.get("/", GetAllOrder);
router.get("/getlimitedorder/getlimitedorder", GetLimitedOrder);


module.exports = router;