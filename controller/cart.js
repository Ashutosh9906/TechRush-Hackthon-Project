const { Types } = require("mongoose");
const Cart = require("../models/cart");
const Product = require("../models/product");

async function handleItemsOfCart(req, res) {
    try {
        userId = req.user.id;
        const items = await Cart.find({ userId })
        // return res.status(200).json(items);
        const populateItems = await Cart.find({ userId }).populate({
            path: "productId",
            select: "productName description category price stock"
        });
        return res.render("cart", {
            populateItems
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Internal server error" })
    }
}

async function handleAddToCart(req, res) {
    try {
        const { productId, quantity } = req.body;
        const pobjId = new Types.ObjectId(productId)
        const product = await Product.findById(productId);
        const cartItem = await Cart.findById(productId);
        if (cartItem) {
            return res.status(400).json({ msg: "Item Already exist in Cart" })
        }
        if (product.stock < quantity) {
            return res.status(400).json({ msg: "No sufficient stock" })
        }
        const cart = await Cart.create({
            userId: req.user.id,
            productId,
            quantity,
        })
        return res.status(200).json({ msg: "Added to cart successful" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Internal server error" })
    }
}

async function handleQuantityCount(req, res) {
    try {
        const { productId, newQuantity } = req.body;
        userId = req.user.id;
        const product = await Product.findById(productId);
        if (product.stock < newQuantity) {
            return res.status(400).json({ msg: "No sufficient stock" })
        }
        const items = await Cart.findOneAndUpdate({ userId, productId }, { quantity: newQuantity }, { new: true })
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Internal Server Error" })
    }
}

async function handleDeleteItem(req, res) {
    try {
        const { cartId } = req.body;
        const userId = req.user.id;
        const cartItem = await Cart.findById(cartId);
        console.log("Cart Item : ", cartItem);
        if (!cartItem) {
            return res.status(400).json({ msg: "Item does not exist in cart" });
        }
        const cObjId = new Types.ObjectId(cartId)
        await Cart.deleteOne(cObjId);
        return res.status(200).json({ msg: "Item Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Internal Server Error" })
    }
}

module.exports = {
    handleItemsOfCart,
    handleAddToCart,
    handleQuantityCount,
    handleDeleteItem
}