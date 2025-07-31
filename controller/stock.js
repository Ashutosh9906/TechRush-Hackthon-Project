const Stock = require("../models/stock");

async function handleRestock(req, res) {
    try {
        const { nameOfProduct, stockCount } = req.body;
        //inserting value in database
        const stock = await Stock.create({ 
            nameOfProduct,
            stockCount,
        })
        return res.status(200).json({ msg: "Success" });
    } catch (error) {
        console.log("Error", error);
        res.status(400).json({ err: "Internal Server Error" })
    }
}

module.exports = {
    handleRestock
}