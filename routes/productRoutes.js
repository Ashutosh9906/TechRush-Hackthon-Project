//predefined modules
const { Router } = require("express");

//custom modules
const { handleItemAll, 
        handleAddProduct, 
        handleItemCatgories, 
        handleRemoveitem, 
        handleProductStock, 
        handleProductDetail 
    } = require("../controller/product")

const router = Router();

//mounting routes on base route
router.get("/all", handleItemAll)
router.get("/", handleItemCatgories)
router.get("/:id", handleProductDetail)
router.post("/", handleAddProduct)
router.patch("/", handleProductStock)
router.delete("/", handleRemoveitem)

module.exports = router;