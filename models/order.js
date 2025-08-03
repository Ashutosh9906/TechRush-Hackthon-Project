const { Schema, model } = require("mongoose")

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    shippingAddress: {
        type: String,
        require: true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["Placed", "Shipped", "Delivered"],
        default: "Placed", 
    }
}, { timestamps: true })

const Order = model("order", orderSchema);

module.exports = Order;