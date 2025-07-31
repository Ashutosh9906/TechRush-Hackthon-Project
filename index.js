//predefined modules
const express = require("express");
const mongoose = require("mongoose");
const { config } = require("dotenv")
config();

//custom modules
const manageStock = require("./routes/manageStock")
const staticRoute = require("./routes/staticRoute")

const app = express();
const PORT = 7000;

//connecting to mongoDB
mongoose.connect(process.env.MONGO_URL)
                .then(() => console.log("MongoDB Connected"));

//middleware for processing raw json response 
app.use(express.json());
app.use(express.urlencoded({ extended:false }))

//defining the base route
app.use("/user", staticRoute)
app.use("/product", manageStock)

//starting the server on PORT 7000
app.listen(PORT, () => console.log("Server started at PORT:7000"));
