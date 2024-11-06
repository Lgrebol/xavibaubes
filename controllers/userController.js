const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const config = require('../config'); // Import the config.js file

const usersFile = path.join(__dirname, '../users.json');

// Register a new user
exports.registerUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if user already exists
    let users = [];
    if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    }

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error encrypting password' });
        }

        // Store the user in the file
        const newUser = { username, password: hashedPassword };
        users.push(newUser);

        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

        // Generate JWT token using the secret from config.js
        const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    });
};
