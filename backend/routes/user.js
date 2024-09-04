const express = require("express");
const cors = require("cors");
const userControllers = require("../controllers/user");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();
router.use(cors());

// This route is now protected by the token
router.get("/users", authMiddleware.authenticateToken, userControllers.getUsers);

module.exports = router;
