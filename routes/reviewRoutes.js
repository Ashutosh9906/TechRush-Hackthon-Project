const { Router } = require("express");
const { handleAddReview, handleGetReview } = require("../controller/review");
const { verifyToken } = require("../middlewares/validateEmail");

const router = Router();

router.get("/:id", handleGetReview);
router.post("/", verifyToken, handleAddReview);

module.exports = router;