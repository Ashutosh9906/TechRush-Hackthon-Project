const { Schema, model } = require("mongoose")

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        require: true
    }
}, { timeStamps: true });

const Review = model("reviews", reviewSchema);

module.exports = Review