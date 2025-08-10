const Review = require("../models/review");
const User = require("../models/user")

async function handleAddReview(req, res) {
    try {
        const productId = req.params.id;
        const { rating, review } = req.body;
        const userId = req.user.id;
        await Review.create({
            userId,
            productId,
            rating,
            review
        })
        console.log("Added successfully")
        return res.status(200).json({ redirect: `/product/${productId}?json=false` });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Internal Server Error" })
    }
}

async function handleGetReview(req, res) {
    try {
        const productId = req.params.id;
        const reviews = await Review.find({ productId })
            .populate("userId"); // Only fetch the 'name' field of the user

        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Internal Server Error" });
    }
}

module.exports = {
    handleAddReview,
    handleGetReview
}