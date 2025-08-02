//predefined modules
const express = require("express");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const { resolve } = require("path")
const cookieParser = require("cookie-parser");
const path = require("node:path");
config();

//custom modules
const manageStock = require("./routes/manageStock")
const staticRoute = require("./routes/staticRoute")
const cartRoute = require("./routes/cartRoutes") 
const { verifyToken } = require("./middlewares/validateEmail")


const app = express();
const PORT = 7000;

//to serve public folder for rendering
app.use(express.static(path.join(__dirname, "public"))); 

//connecting to mongoDB
mongoose.connect(process.env.MONGO_URL)
                .then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", resolve("./views"));

//middleware for processing raw json response 
app.use(express.json());
app.use(express.urlencoded({ extended:false }))
app.use(cookieParser());

//defining the base route
app.use("/user", staticRoute)
app.use("/product", manageStock)
app.use("/cart", verifyToken, cartRoute)

//starting the server on PORT 7000
app.listen(PORT, () => console.log("Server started at PORT:7000"));
