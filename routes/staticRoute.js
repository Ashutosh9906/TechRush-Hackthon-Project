const { Router } = require("express");

const router = Router();

router.get("/createAccount", (req, res) => {
    return res.render("createAccount");
})

module.exports = router;