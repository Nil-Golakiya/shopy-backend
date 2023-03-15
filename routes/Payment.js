const express = require("express");
const { checkout, paymentVerification, totalAmount } = require("../controllers/payment");


const router = express.Router();

router.post("/checkout", checkout);
router.post("/paymentverification", paymentVerification);
router.get("/totalamount/earning", totalAmount);

module.exports = router;