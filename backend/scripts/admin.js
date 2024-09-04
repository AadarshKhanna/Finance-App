const bcrypt = require("bcrypt");
const { readFile, writeFile } = require("../utils/file");

async function createAdminAccount() {
    try {
        const users = readFile("./data/users.json");
        const existingAdmin = users.find(user => user.email === "admin@test.com");
        if (!existingAdmin) {
            const newAdmin = {
                id: users.length + 1,
                email: "admin@test.com",
                name: "Admin",
                password: await bcrypt.hash("admin", 10),
                role: "admin" // Ensure the role is set to admin
            };
            users.push(newAdmin);
            writeFile("./data/users.json", users);
            console.log("Admin account created successfully");
        } else {
            console.log("Admin already exists");
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = createAdminAccount;
