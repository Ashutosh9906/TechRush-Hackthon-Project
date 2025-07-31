const { randomInt } = require("crypto");
const { sendOtp } = require("../utilities/otpUtilty");
const { hash, compare } = require("bcryptjs")

const Otp = require("../models/otp");

async function handleSendOtp(req, res) {
    try {
        const OTP = randomInt(100000, 1000000);
        const recipientEmail = req.body.email;

        await sendOtp(OTP, recipientEmail);

        const saltRounds = 10;
        const hashedOtp = await hash(OTP.toString(), saltRounds);

        await Otp.updateOne(
            { email: recipientEmail },
            { $set: { otp: hashedOtp, createdAt: new Date() } },
            { upsert: true }
        )
        return res.status(200).json({ msg: "Email Send Succesfully" })
    } catch (error) {
        console.log("Error in Sednding Email:", error);
        return res.status(401).json({ msg: "Invalid Email" })
    }
}

async function handleOtpVerification(req, res) {
    try {
        const { email, otp } = req.body;
        const user = await Otp.findOne({ email });
        // console.log(user);

        const isMatch = await compare(otp, user.otp);
        if (isMatch) {
            await Otp.findOneAndUpdate({ email }, { isVerified: true });
            return res.status(200).json({ status: "success" });
        }
        // console.log("Otp isMatched: ", isMatch)
        return res.status(401).json({ status: "failed" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "internal server error" });
    }
}

module.exports = {
    handleSendOtp,
    handleOtpVerification
}