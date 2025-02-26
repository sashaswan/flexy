const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors'); // Add cors package
const cookieParser = require('cookie-parser'); // Add cookie-parser package
require('dotenv').config(); // Add dotenv for environment variables
const path = require('path');
const followRoutes = require('./routes/follow');

// Initialize Express app
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Allow credentials
}));
app.use(cookieParser()); // Add cookie-parser middleware

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/follow', followRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
