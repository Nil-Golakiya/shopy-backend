const express = require("express");
const { preTransactionHandler, postTransactionHandler} = require("../controllers/pretransaction");

const router = express.Router();

router.post("/pretransaction", preTransactionHandler);
router.post("/posttransaction", postTransactionHandler);



module.exports = router;