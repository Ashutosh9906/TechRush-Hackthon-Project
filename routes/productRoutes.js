//predefined modules
const { Router } = require("express");

//custom modules
const { handleItemAll, 
        handleAddProduct, 
        handleItemCatgories, 
        handleRemoveitem, 
        handleProductStock, 
        handleProductDetail 
    } = require("../controller/product");
const { verifyToken } = require("../middlewares/validateEmail");

const router = Router();

//mounting routes on base route
router.get("/all", handleItemAll)
router.get("/", handleItemCatgories)
router.get("/:id", handleProductDetail)
router.post("/", verifyToken, handleAddProduct)
router.patch("/", verifyToken, handleProductStock)
router.delete("/", verifyToken, handleRemoveitem)

module.exports = router;