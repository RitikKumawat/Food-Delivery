const express = require("express");
const {capturePayment,verifyPayment} = require("../controllers/Payment");
const { verifyToken } = require("../middleware/auth");


const router = express.Router();

router.post("/capturePayment",verifyToken,capturePayment);
router.post("/verifyPayment",verifyToken,verifyPayment);

module.exports = router;