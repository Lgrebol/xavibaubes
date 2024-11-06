const jwt = require('jsonwebtoken');
const { createUser, saveUser, getUserByUsername } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerUser = (req, res) => {
    const { username, password } = req.body;

    if (getUserByUsername(username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = createUser(username, password);
    saveUser(user);

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });

    res.status(201).json({ token });
};

module.exports = { registerUser };
