const { Router } = require("express");
const { verifyToken } = require("../middlewares/validateEmail");
const { handleBuyDetails, handlePlaceOrder, handleCartCheckout } = require("../controller/buyNow");

const router = Router();

router.get("/:id", verifyToken, handleBuyDetails);
router.post("/cartCheckout", verifyToken, handleCartCheckout)
router.post("/:id", verifyToken, handlePlaceOrder);

module.exports = router