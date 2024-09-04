const bcrypt = require("bcrypt");
const { readFile } = require("../utils/file");
const { generateToken } = require("../utils/jwtUtils");

async function login(email, password) {
    try {
        const users = readFile("./data/users.json");
        const existingUser = users.find(user => user.email === email);
        if (!existingUser) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }
        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        console.log("Login error: ", error.message);
        throw new Error("Invalid credentials");
    }
}

module.exports = {
    login
};
