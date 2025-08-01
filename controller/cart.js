const { Types } = require("mongoose");
const Cart = require("../models/cart");
const Product = require("../models/product");

async function handleAddToCart(req, res) {
    try {
        const { productId, quantity } = req.body;
        const pobjId = new Types.ObjectId(productId)
        const product = await Product.findById(productId)
        if (product.stock < quantity) {
            return res.status(400).json({ msg: "No sufficient stock" })
        }
        const cart = await Cart.create({
            userId: req.user._id,
            productId,
            quantity,
        })
        return res.status(200).json({ msg: "Added to cart successful" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Internal server error" })
    }
}

async function handleQuantityCount(req, res){
    req.body;
}

module.exports = {
    handleAddToCart,
    handleQuantityCount
}