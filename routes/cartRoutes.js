const { Router, application } = require("express");
const { handleAddToCart, handleQuantityCount } = require("../controller/cart");
const { verifyToken } = require("../middlewares/validateEmail");

const router = Router();

router.post("/", verifyToken, handleAddToCart);
router.patch("/", handleQuantityCount)

module.exports = router;