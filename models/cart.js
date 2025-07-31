const { Schema, model, default: mongoose } = require("mongoose")

new cartSchema = Schema({
    userId: {
        type: mongoose.Schema.Types.userId,
        ref: "user",
    },
    items: [{
        productId: { 
            type: mongoose.Schema.Types.userId, 
            ref: "product" 
        },
        quantity: Number
    }]
}, { timestamps: true });

const Cart = model("cart", cartSchema);

module.exports = Cart;