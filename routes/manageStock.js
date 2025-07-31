//predefined modules
const { Router } = require("express");

//custom modules
const { handleRestock } = require("../controller/stock")

const router = Router();

//mounting routes on base route
router.post("/stock", handleRestock);

module.exports = router;