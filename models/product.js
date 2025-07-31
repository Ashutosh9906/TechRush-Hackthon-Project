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
    price: {
        type: Number,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
})

const Product = mongoose.model("product", productSchema);

module.exports = Product;