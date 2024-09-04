const { readFile } = require("../utils/file");

async function getUsers() {
    const users = readFile("./data/users.json");
    return users;
}

module.exports = { getUsers };
