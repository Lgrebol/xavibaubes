const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
const uuid = require('uuid');

const usersFilePath = path.join(__dirname, '../users.json');

function saveUser(user) {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8') || '[]');
    users.push(user);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

function createUser(username, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return {
        id: uuid.v4(),
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    };
}

function getUserByUsername(username) {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8') || '[]');
    return users.find(user => user.username === username);
}

module.exports = { createUser, saveUser, getUserByUsername };
