const { Schema, model } = require("mongoose")

//Creating User Schema
const stockSchema = new Schema({
    nameOfProduct:{
        type:String,
        require:true,
    },
    stockCount:{
        type:Number,
        require:true,
    }
}, { timestamps:true })

//creation of collection
const Stock = model("stock", stockSchema);

module.exports = Stock