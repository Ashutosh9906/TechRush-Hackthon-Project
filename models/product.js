const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    detail: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    image1: {
        type: String,
        require: true,
    },
    image2: {
        type: String,
        require: true,
    },
    image3: {
        type: String,
        require: true,
    },
})

const Product = mongoose.model("product", productSchema);

module.exports = Product;