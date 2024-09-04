const bcrypt = require("bcrypt");
const { readFile, writeFile } = require("../utils/file");

async function createUser(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = readFile("./data/users.json");
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword,
        role: "customer"
    };
    users.push(newUser);
    writeFile("./data/users.json", users);
    return newUser;
}

module.exports = { createUser };
