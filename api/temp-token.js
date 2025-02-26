// temp-token.js
// This is a temporary script to generate a test token
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create a dummy user payload
const payload = {
  user: {
    id: '507f1f77bcf86cd799439011' // This is a dummy MongoDB ObjectId format
  }
};

// Sign the token
jwt.sign(
  payload,
  process.env.JWT_SECRET || 'defaultsecret',
  { expiresIn: '1h' },
  (err, token) => {
    if (err) throw err;
    console.log('Test token:');
    console.log(token);
  }
);
