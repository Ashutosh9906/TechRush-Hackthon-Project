const Product = require("../models/product");
const Review = require("../models/review");
const User = require("../models/user");

async function handleItemAll(req, res) {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    }
    catch (error) {
        console.log("Error : ", error);
        return res.status(401).json({ msg: "Internal Server Error" });
    }
}
async function handleAddProduct(req, res) {
    try {
        const { productName, description, detail, category, price, stock, image1, image2, image3 } = req.body;
        const isProduct = await Product.findOne({ productName });
        if (isProduct) {
            return res.status(400).json({ msg: "The product already exist in Stock" })
        }
        await Product.create({
            productName,
            description,
            detail,
            category,
            price,
            stock,
            image1,
            image2,
            image3
        })
        return res.status(200).json({ msg: "Product Added Successfully" });
    } catch (error) {
        console.log("Error : ", error);
        return res.status(401).json({ msg: "Internal Server Error" });
    }
}
async function handleItemCatgories(req, res) {
    try {
        const category = req.query.category;
        const categoryItems = await Product.find({ category });
        if (!categoryItems) {
            return res.status(200).json({ msg: "No Such Catogory" })
        }
        return res.status(200).json(categoryItems);
    } catch (error) {
        console.log("Error : ", error);
        return res.status(401).json({ msg: "Internal Server Error" });
    }
}
async function handleProductStock(req, res) {
    try {
        const { productId, newStock } = req.body;
        const product = await Product.findById(productId);
        // console.log(product);
        if (!product) {
            return res.status(400).json({ msg: "No Such Product" })
        }
        const items = await Product.findOneAndUpdate({ _id: productId }, { stock: newStock }, { new: true })
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Internal Server Error" })
    }
}
async function handleRemoveitem(req, res) {
    try {
        const { productId } = req.body;
        const item = await Product.findById(productId);
        // console.log(item);
        if (!item) {
            return res.status(400).json({ mas: "No Such Product" })
        }
        await Product.deleteOne({ _id: productId });
        return res.status(200).json({ msg: "Item deleted Successfully" })
    } catch (error) {
        console.log("Error : ", error);
        return res.status(401).json({ msg: "Internal Server Error" });
    }
}
async function handleProductDetail(req, res) {
    try {
        const productId = req.params.id;
        const json = req.query.json;
        const product = await Product.findById(productId);
        const reviews = await Review.find({ productId });
        const userId = req.user.id;
        const user = await User.findById(userId);
        console.log(reviews);
        if (!product) {
            return res.status(400).json({ msg: "No Such Product" })
        }
        if (json == "true") {
            return res.status(200).json({
                product,
                reviews,
                user // Send logged-in user info (or null if not logged in)
            });
        } else {
            return res.render("product", {
                product,
                reviews,
                user
            });
        }
        // return res.render("homepage", {product})
        // return res.status(200).json(product)\
    } catch (error) {
        console.log("Error : ", error);
        return res.status(401).json({ msg: "Internal Server Error" });
    }
}

module.exports = {
    handleItemAll,
    handleAddProduct,
    handleItemCatgories,
    handleProductStock,
    handleRemoveitem,
    handleProductDetail
}