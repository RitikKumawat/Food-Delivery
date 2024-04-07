const express = require("express");

const { recentOrder } = require("../controllers/product");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/recentOrders",verifyToken,recentOrder);

module.exports = router;