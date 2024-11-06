const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const config = require('./config'); // Import the config.js file

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use user routes
app.use('/api/users', userRoutes);

// Start server using the port from config.js
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
