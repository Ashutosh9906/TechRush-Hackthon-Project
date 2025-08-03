const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");
const { sendOrderdetail } = require("../utilities/mailUtility");

async function handleBuyDetails(req, res) {
    try {
        const productId = req.params.id;
        const user = await User.findById(req.user.id);
        const product = await Product.findById(productId);
        if (product.stock < req.query.quantity) {
            return res.status(200).json({ msg: "Not Enough Stock" })
        }
        const data = [{
            UserName: user.firstName,
            Address: user.address,
            Email: user.email,
            ProductName: product.productName,
            quantity: req.query.quantity,
            price: product.price * req.query.quantity
        }]
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Internal server error" })
    }
}

async function handlePlaceOrder(req, res) {
    try {
        const { address } = req.body;
        let shippingAddress = "";
        const productId = req.params.id;
        const quantity = parseInt(req.query.quantity);
        const user = await User.findById(req.user.id);
        const product = await Product.findById(productId);
        if (address) {
            shippingAddress = address
        }
        else {
            shippingAddress = user.address;
        }
        const order = await Order.create({
            userId: user._id,
            shippingAddress,
            products: [{
                productId,
                quantity
            }],
            totalAmount: quantity * product.price
        })
        product.stock -= quantity;
        await product.save();

        const populatedOrder = await Order.findById(order._id)
            .populate({
                path: "userId",
                select: "firstName address email"
            })
            .populate({
                path: "products.productId",
                select: "productName price"
            });
        // console.log(populatedOrder);

        await sendOrderdetail(populatedOrder)
        return res.status(200).json({ msg: "Order Placed Successfully" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Internal server error" })
    }
}

async function handleCartCheckout(req, res) {
    try {
        const { address } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (address) {
            shippingAddress = address
        }
        else {
            shippingAddress = user.address;
        }
        const cartItems = await Cart.find({ userId }).populate("productId")
        if (cartItems.length === 0) {
            return res.status(400).json({ msg: "No Items in Cart" })
        }

        const products = [];
        let totalAmount = 0;
        for (let item of cartItems) {
            const product = item.productId
            if (!product) {
                return res.status(400).json({ msg: "Product not found in Cart" })
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ msg: "No Sufficient Stock" })
            }
            products.push({
                productId: product._id,
                quantity: item.quantity
            })
            totalAmount += product.price * item.quantity;
        }

        const order = await Order.create({
            userId,
            shippingAddress,
            products,
            totalAmount
        })

        for (let item of cartItems) {
            const product = item.productId;
            product.stock -= item.quantity;
            await product.save();
        }

        await Cart.deleteMany({ userId });

        const populatedOrder = await Order.findById(order._id)
            .populate({
                path: "userId",
                select: "firstName address email"
            })
            .populate({
                path: "products.productId",
                select: "productName price"
            });

        await sendOrderdetail(populatedOrder)
        return res.status(200).json({ msg: "Order Placed Successfully" })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Internal server error" })
    }
}

module.exports = {
    handleBuyDetails,
    handlePlaceOrder,
    handleCartCheckout
}