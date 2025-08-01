const { Router } = require("express");

const { handleUserInfo, handleVerifyPassword } = require("../controller/user")
const { handleSendOtp, handleOtpVerification } = require("../controller/otpCont")
const { validateEmail, otpCoolDown, validateOtp, CheckEmail } = require("../middlewares/validateEmail")

const router = Router();

router.get("/createAccount", (req, res) => {
    return res.render("createAccount");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the 'token' cookie
    res.redirect('/user/login'); // Redirect to login page
});


router.post("/createAccount", handleUserInfo);
router.post("/sendOtp", validateEmail, otpCoolDown, CheckEmail, handleSendOtp,);
router.post("/verifyOtp", validateOtp, handleOtpVerification);
router.post("/verifyPassword", handleVerifyPassword);

module.exports = router