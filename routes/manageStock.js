//predefined modules
const { Router } = require("express");

//custom modules
const { handleRestock } = require("../controller/stock")
const { handleProductInfo}=require("../controller/product")

const router = Router();

//mounting routes on base route
router.post("/stock", handleRestock);

router.post("/addStock", handleProductInfo);

module.exports = router;