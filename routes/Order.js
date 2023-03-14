const express = require("express");
const { GetOrderByUserId, GetOrderByOrderId, GetAllOrder, GetLimitedOrder, topsellingproduct, CreateOrder, GetPaymentInfoByOrderId } = require("../controllers/Order");

const router = express.Router();

router.get("/:id", GetOrderByUserId);
router.get("/orderdetils/:id", GetOrderByOrderId);
router.get("/", GetAllOrder);
router.get("/getlimitedorder/getlimitedorder", GetLimitedOrder);
router.get("/admin/topselling", topsellingproduct);
router.post("/", CreateOrder);
router.post("/payment/details/paymentinfo", GetPaymentInfoByOrderId);



module.exports = router;