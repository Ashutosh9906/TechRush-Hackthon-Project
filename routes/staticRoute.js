const { Router } = require("express");

const { handleUserInfo, handleVerifyPassword, handleGetProfile, handleAdminPage } = require("../controller/user")
const { handleSendOtp, handleOtpVerification } = require("../controller/otpCont")
const { validateEmail, otpCoolDown, validateOtp, CheckEmail, verifyToken } = require("../middlewares/validateEmail");
const { checkAuthorizationForAdmin } = require("../middlewares/authorization");

const router = Router();

router.get("/createAccount", (req, res) => {
    return res.render("createAccount");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the 'token' cookie
    res.redirect('/home'); // Redirect to login page
});
router.get("/profile", verifyToken, handleGetProfile)
router.get("/admin", verifyToken, checkAuthorizationForAdmin, handleAdminPage)


router.post("/createAccount", handleUserInfo);
router.post("/sendOtp", validateEmail, otpCoolDown, CheckEmail, handleSendOtp,);
router.post("/verifyOtp", validateOtp, handleOtpVerification);
router.post("/verifyPassword", handleVerifyPassword);

module.exports = router