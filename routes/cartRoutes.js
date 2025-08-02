const { Router, application } = require("express");
const { handleAddToCart, handleQuantityCount, handleItemsOfCart, handleDeleteItem } = require("../controller/cart");
const { verifyToken } = require("../middlewares/validateEmail");

const router = Router();

router.get("/", handleItemsOfCart)
router.post("/", handleAddToCart);
router.patch("/", handleQuantityCount)
router.delete("/", handleDeleteItem)

module.exports = router;