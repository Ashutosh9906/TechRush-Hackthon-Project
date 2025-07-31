const Product = require("../models/product")
async function handleProductInfo(req, res) {
    try {
        const { productName, discription, price, stock } = req.body;
        const product = await Product.create({
            productName,
            discription,
            price,
            stock,
        })
        return res.status(200).json({ msg: "stock added successfully" })
    }


    catch (error) {
        console.log("Error : ", error);
        return res.status(401).json({ success: false });
    }
}

module.exports = {
    handleProductInfo
}