const User = require("../models/user")
const crpto = require("crypto");
const { sendOtp } = require("../utilities/mailUtility");
const { hash, compare } = require("bcryptjs");
const { createTokenForUser } = require("../utilities/authentication")

const Otp = require("../models/otp");

async function handleUserInfo(req, res) {
    //console.log(req.body);
    try {
        const { firstName, address, lastName, email, password } = req.body;

        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.render("createAccount", {
                isUser,
            })
        }

        const saltRounds = 10;
        const hashPassword = await hash(password, saltRounds);

        const otpUser = await Otp.findOne({ email })
        //console.log(otpUser);
        if (!otpUser || !otpUser.isVerified) {
            return res.status(400).json({ msg: "verify your email first" });
        }

        const user = await User.create({
            firstName,
            lastName,
            address,
            email,
            password: hashPassword,
        })

        const token = createTokenForUser(user._id, user.role);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 30 * 60 * 1000
        });
        res.locals.token = req.cookies.token

        return res.status(200).json({
            redirect: "/home",
            firstName: user.firstName,
            id: user._id
        });
    } catch (error) {
        console.log("Error : ", error);
        return res.status(401).json({ success: false });
    }
}

async function handleVerifyPassword(req, res) {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    //console.log("User : ", user);
    if (!user) {
        return res.status(404).json({ err: "User not exist" });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ err: "Error" })
    }

    const token = createTokenForUser(user._id, user.role);
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 30 * 60 * 1000
    });
    res.locals.token = req.cookies.token

    // console.log("Status: Failed")
    //console.log("Status: Success")
    return res.status(200).json({
        redirect: "/home",
        firstName: user.firstName,
        id: user._id
    });
}

module.exports = {
    handleUserInfo,
    handleVerifyPassword
}