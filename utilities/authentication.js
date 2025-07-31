const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function createTokenForUser(id, role){
    const payload = { id, role }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "30m" });
    return token;
}

function verifyTokenUser(token){
    const user = jwt.verify(token, process.env.SECRET)
    if(!user) return;
    return user;
}

module.exports = {
    createTokenForUser,
    verifyTokenUser
}