// routes/auth.js - Complete file with all routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /auth/me
// @desc    Get current user information
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(200).json({
                resultCode: 1,
                messages: ['User not found'],
                data: {}
            });
        }

        res.status(200).json({
            resultCode: 0,
            messages: [],
            data: {
                id: user.id,
                email: user.email,
                login: user.login
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(200).json({
            resultCode: 1,
            messages: ['Server Error'],
            data: {}
        });
    }
});

// @route   POST /auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                resultCode: 1,
                messages: errors.array().map(error => error.msg),
                data: {}
            });
        }

        const { email, password, rememberMe, captcha } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(200).json({
                    resultCode: 1,
                    messages: ['Invalid credentials'],
                    data: {}
                });
            }

            // Check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(200).json({
                    resultCode: 1,
                    messages: ['Invalid credentials'],
                    data: {}
                });
            }

            // Create JWT payload
            const payload = {
                user: {
                    id: user.id
                }
            };

            // Set token expiration based on rememberMe
            const expiresIn = rememberMe ? '7d' : '1h';

            // Sign token
            jwt.sign(
                payload,
                process.env.JWT_SECRET || 'defaultsecret',
                { expiresIn },
                (err, token) => {
                    if (err) throw err;

                    // Set token in cookie
                    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

                    // Return successful response
                    res.status(200).json({
                        resultCode: 0,
                        messages: [],
                        data: {
                            userId: user.id
                        }
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(200).json({
                resultCode: 1,
                messages: ['Server error'],
                data: {}
            });
        }
    }
);

// @route   POST /auth/register
// @desc    Register a user
// @access  Public
router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('login', 'Login is required').not().isEmpty(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                resultCode: 1,
                messages: errors.array().map(error => error.msg),
                data: {}
            });
        }

        const { email, login, password } = req.body;

        try {
            // Check if user exists
            let userEmail = await User.findOne({ email });
            if (userEmail) {
                return res.status(200).json({
                    resultCode: 1,
                    messages: ['User with this email already exists'],
                    data: {}
                });
            }

            let userLogin = await User.findOne({ login });
            if (userLogin) {
                return res.status(200).json({
                    resultCode: 1,
                    messages: ['User with this login already exists'],
                    data: {}
                });
            }

            // Generate a random 5 numeric userId
            const generateRandomUserId = () => Math.floor(10000 + Math.random() * 90000).toString();

            // Create new user
            let user = new User({
                _id: generateRandomUserId(), // Set the _id field
                email,
                login,
                password
            });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Save user
            await user.save();

            // Create JWT payload
            const payload = {
                user: {
                    id: user._id
                }
            };

            // Sign token
            jwt.sign(
                payload,
                process.env.JWT_SECRET || 'defaultsecret',
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;

                    // Set token in header
                    res.header('x-auth-token', token);

                    // Return successful response
                    res.status(200).json({
                        resultCode: 0,
                        messages: [],
                        data: {
                            userId: user._id
                        }
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(200).json({
                resultCode: 1,
                messages: ['Server error'],
                data: {}
            });
        }
    }
);

// @route   DELETE /auth/login
// @desc    Logout user by clearing token cookie
// @access  Private
router.delete('/login', auth, async (req, res) => {
    try {
        // Clear the auth token cookie
        res.clearCookie('token');

        // Return successful response
        res.status(200).json({
            resultCode: 0,
            messages: [],
            data: {}
        });
    } catch (err) {
        console.error(err.message);
        res.status(200).json({
            resultCode: 1,
            messages: ['Server error during logout'],
            data: {}
        });
    }
});
module.exports = router;