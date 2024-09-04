const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role // Include user role in the token
    };
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

module.exports = {
    generateToken
};
