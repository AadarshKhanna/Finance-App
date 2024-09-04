const { readFile } = require("../utils/file");

async function getUsers(req, res) {
    try {
        const users = readFile("./data/registration_data.json");

        if (req.user.role === "admin") {
            // Admin: Return all users
            res.json(users);
        } else {
            // Regular user: Return only their own details
            const user = users.find(u => u.id === req.user.id);
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getUsers };
