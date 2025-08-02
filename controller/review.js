const Review = require("../models/review");

async function handleAddReview(req, res) {
    try {
        const { productId, rating, review } = req.body;
        const userId = req.user.id;
        await Review.create({
            userId,
            productId,
            rating,
            review
        })
        return res.status(200).json({ msg: "Review Added Successfully" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Internal Server Error" })
    }
}

async function handleGetReview(req, res) {
    try {
        const productId = req.params.id;
        const review = await Review.find({ productId })
        // console.log(review);
        return res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Internal Server Error" })
    }
}

module.exports = {
    handleAddReview,
    handleGetReview
}