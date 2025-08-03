function checkAuthorizationForAdmin(req, res, next) {
    try {
        if (req.user.role != "ADMIN") {
            return res.status(400).json({ msg: "You are unauthorized" })
        }
        return next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

module.exports = {
    checkAuthorizationForAdmin
}