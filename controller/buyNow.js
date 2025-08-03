const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
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
        await sendOrderdetail(order, user, product)
        return res.status(200).json({ msg: "Order Placed Successfully" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Internal server error" })
    }
}

module.exports = {
    handleBuyDetails,
    handlePlaceOrder
}