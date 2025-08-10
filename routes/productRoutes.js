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
const { checkAuthorizationForAdmin } = require("../middlewares/authorization");

const router = Router();

//mounting routes on base route
router.get("/all", handleItemAll)
router.get("/", handleItemCatgories)
router.get("/:id", verifyToken, handleProductDetail)
router.post("/", verifyToken, checkAuthorizationForAdmin, handleAddProduct)
router.patch("/", verifyToken, checkAuthorizationForAdmin, handleProductStock)
router.delete("/", verifyToken, checkAuthorizationForAdmin, handleRemoveitem)

module.exports = router;