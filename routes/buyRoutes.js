const { Router } = require("express");
const { handleBuyDetails, handlePlaceOrder } = require("../controller/buyNow");
const { verifyToken } = require("../middlewares/validateEmail");

const router = Router();

router.get("/:id", verifyToken, handleBuyDetails);
router.post("/:id", verifyToken, handlePlaceOrder)

module.exports = router