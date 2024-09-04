const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        console.error("No authorization header provided");
        return res.status(401).json({ message: "Unauthorized: Missing token!" });
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        console.error("Invalid token format");
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.status(403).json({ message: "Forbidden: Invalid Token" });
        }

        req.user = user;
        console.log("Token authenticated successfully");
        next();
    });
}

module.exports = { authenticateToken };
