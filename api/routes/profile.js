const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   PUT /profile
// @desc    Update user profile
// @access  Private
router.put(
    '/',
    [
        auth,
        [
            check('lookingForAJob', 'Looking for a job status is required').isBoolean(),
            check('lookingForAJobDescription', 'Job description is required').not().isEmpty(),
            check('fullName', 'Full name is required').not().isEmpty(),
            check('aboutMe', 'About me is required').not().isEmpty(),
            check('contacts', 'Contacts object is required').isObject(),
            check('contacts.github', 'GitHub contact is required').not().isEmpty(),
            check('contacts.vk', 'VK contact is required').not().isEmpty(),
            check('contacts.facebook', 'Facebook contact is required').not().isEmpty(),
            check('contacts.instagram', 'Instagram contact is required').not().isEmpty(),
            check('contacts.twitter', 'Twitter contact is required').not().isEmpty(),
            check('contacts.website', 'Website contact is required').not().isEmpty(),
            check('contacts.youtube', 'YouTube contact is required').not().isEmpty(),
            check('contacts.mainLink', 'Main link is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                resultCode: 1,
                messages: errors.array().map(error => error.msg),
                data: {}
            });
        }

        const {
            lookingForAJob,
            lookingForAJobDescription,
            fullName,
            aboutMe,
            contacts,
            photos
        } = req.body;

        try {
            // Get current user
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(200).json({
                    resultCode: 1,
                    messages: ['User not found'],
                    data: {}
                });
            }

            // Update profile fields
            user.fullName = fullName;
            user.aboutMe = aboutMe;
            user.lookingForAJob = lookingForAJob;
            user.lookingForAJobDescription = lookingForAJobDescription;
            user.contacts = contacts;
            if (photos) {
                user.photo = photos;
            }

            // Save updated user
            await user.save();

            res.status(200).json({
                resultCode: 0,
                messages: [],
                data: {}
            });
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

// @route   GET /profile/:userId
// @desc    Get user profile by userId
// @access  Public
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find user by ID
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(200).json({
                resultCode: 1,
                messages: ['User not found'],
                data: {}
            });
        }

        // Format contact data - set null for empty values
        const contacts = {
            facebook: user.contacts?.facebook || null,
            website: user.contacts?.website || null,
            vk: user.contacts?.vk || null,
            twitter: user.contacts?.twitter || null,
            instagram: user.contacts?.instagram || null,
            youtube: user.contacts?.youtube || null,
            github: user.contacts?.github || null,
            mainLink: user.contacts?.mainLink || null
        };

        // Format the profile data according to the new structure
        const profileData = {
            aboutMe: user.aboutMe || "",
            contacts: contacts,
            lookingForAJob: user.lookingForAJob || false,
            lookingForAJobDescription: user.lookingForAJobDescription || "",
            fullName: user.fullName || "",
            userId: parseInt(user._id.toString().slice(-5), 10), // Convert ObjectId to a numeric ID
            photos: {
                small: user.photo?.small || null,
                large: user.photo?.large || null
            }
        };

        // Return the data directly without the wrapper format
        res.status(200).json(profileData);

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(200).json({
                resultCode: 1,
                messages: ['Invalid user ID format'],
                data: {}
            });
        }
        res.status(200).json({
            resultCode: 1,
            messages: ['Server error'],
            data: {}
        });
    }
});

// @route   PUT /profile/status
// @desc    Update user status
// @access  Private
router.put(
    '/status',
    [
        auth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('status', 'Status cannot exceed 300 characters').isLength({ max: 300 })
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                resultCode: 1,
                messages: errors.array().map(error => error.msg),
                data: {}
            });
        }

        const { status } = req.body;

        try {
            // Find user
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(200).json({
                    resultCode: 1,
                    messages: ['User not found'],
                    data: {}
                });
            }

            // Update user status
            user.status = status;

            // Save updated user
            await user.save();

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
                messages: ['Server error'],
                data: {}
            });
        }
    }
);
// @route   GET /profile/status/:userId
// @desc    Get user status by userId
// @access  Public
router.get('/status/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find user by ID
        const user = await User.findById(userId).select('status');

        if (!user) {
            return res.status(200).json({
                resultCode: 1,
                messages: ['User not found'],
                data: {}
            });
        }

        // Return the status directly
        res.status(200).send(user.status || "");
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(200).json({
                resultCode: 1,
                messages: ['Invalid user ID format'],
                data: {}
            });
        }
        res.status(200).json({
            resultCode: 1,
            messages: ['Server error'],
            data: {}
        });
    }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userImagesDir = path.join(__dirname, '../public/images/users');

        // Create directory if it doesn't exist
        if (!fs.existsSync(userImagesDir)) {
            fs.mkdirSync(userImagesDir, { recursive: true });
        }

        // Create user-specific directory
        const userId = req.user.id;
        const userDir = path.join(userImagesDir, userId);
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }

        cb(null, userDir);
    },
    filename: function (req, file, cb) {
        // Generate a timestamp to ensure uniqueness
        const timestamp = Date.now();
        // Original file for large image
        const originalName = `user-${timestamp}.jpg`;
        cb(null, originalName);
    }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB limit
    }
});

// @route   PUT /profile/photo
// @desc    Upload user profile photo
// @access  Private
router.put('/photo', auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(200).json({
                data: {},
                messages: ["No image provided"],
                fieldsErrors: [{ field: "image", error: "Required field" }],
                resultCode: 1
            });
        }

        const userId = req.user.id;
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const version = Date.now(); // Use timestamp as version

        // Create small version of the image 
        // In a real app, you'd use an image processing library like Sharp
        const originalPath = req.file.path;
        const originalFilename = path.basename(originalPath);
        const smallFilename = `user-small-${path.basename(originalFilename)}`;
        const smallPath = path.join(path.dirname(originalPath), smallFilename);

        // Here you would resize the image to create a small version
        // For this example, we'll just copy the file
        fs.copyFileSync(originalPath, smallPath);

        // Generate URLs for the images
        const largeUrl = `${baseUrl}/images/users/${userId}/${originalFilename}?v=${version}`;
        const smallUrl = `${baseUrl}/images/users/${userId}/${smallFilename}?v=${version}`;

        // Update user in database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(200).json({
                data: {},
                messages: ["User not found"],
                fieldsErrors: [],
                resultCode: 1
            });
        }

        // Update user's photo info
        user.photo = {
            small: smallUrl,
            large: largeUrl
        };

        await user.save();

        // Return success response
        res.status(200).json({
            data: {
                photos: {
                    small: smallUrl,
                    large: largeUrl
                }
            },
            messages: [],
            fieldsErrors: [],
            resultCode: 0
        });
    } catch (error) {
        console.error('Error uploading profile photo:', error);
        res.status(200).json({
            data: {},
            messages: ["Server error"],
            fieldsErrors: [],
            resultCode: 1
        });
    }
});

module.exports = router;