const { Schema, model } = require("mongoose");

const otpSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    otp: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
    }
}, { timestamps:true });

const Otp = model("otps", otpSchema);

module.exports = Otp