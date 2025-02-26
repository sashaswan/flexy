const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /users
// @desc    Get users with filtering, pagination and search
// @access  Public (with different results for authenticated users)
router.get('/', async (req, res) => {
    try {
        // Extract query parameters with defaults
        const count = Math.min(parseInt(req.query.count) || 10, 100); // Max 100 items
        const page = parseInt(req.query.page) || 1;
        const term = req.query.term || '';
        const friendParam = req.query.friend;

        // Calculate skip value for pagination
        const skip = (page - 1) * count;

        // Build query filters
        let filter = {};

        // Add search term filter if provided
        if (term) {
            filter.login = { $regex: term, $options: 'i' }; // Case-insensitive search
        }

        // Get current user ID if authenticated
        let currentUserId = null;
        if (req.headers['x-auth-token'] || req.cookies.token) {
            try {
                const decoded = jwt.verify(
                    req.headers['x-auth-token'] || req.cookies.token,
                    process.env.JWT_SECRET || 'defaultsecret'
                );
                currentUserId = decoded.user.id;
            } catch (err) {
                // Invalid token, continue as anonymous
            }
        }

        // Execute query
        let users;
        let totalCount;

        if (currentUserId && friendParam !== undefined) {
            // We need to check the followed status
            const currentUser = await User.findById(currentUserId);

            if (!currentUser) {
                return res.status(200).json({
                    items: [],
                    totalCount: 0,
                    error: "Current user not found"
                });
            }

            // Get the list of followed users from the current user
            // Note: You'll need to implement this field in your User model
            const followingList = currentUser.following || [];

            if (friendParam === 'true') {
                // Only followed users
                filter._id = { $in: followingList };
            } else if (friendParam === 'false') {
                // Only not followed users
                filter._id = { $nin: followingList, $ne: currentUserId };
            }
        }

        // Get total count first
        totalCount = await User.countDocuments(filter);

        // Then get paginated results
        users = await User.find(filter)
            .select('_id login status photo')
            .skip(skip)
            .limit(count);

        // Format the response
        const items = await Promise.all(users.map(async (user) => {
            let followed = false;

            // Check if current user is following this user
            if (currentUserId) {
                const currentUser = await User.findById(currentUserId);
                if (currentUser && currentUser.following) {
                    followed = currentUser.following.includes(user._id);
                }
            }

            return {
                id: user._id,
                name: user.login, // Using login as name based on your model
                status: user.status || null,
                photos: {
                    small: user.photo?.small || null,
                    large: user.photo?.large || null
                },
                followed
            };
        }));

        // Return response
        res.status(200).json({
            items,
            totalCount,
            error: null
        });
    } catch (err) {
        console.error(err.message);
        res.status(200).json({
            items: [],
            totalCount: 0,
            error: "Server error"
        });
    }
});

module.exports = router;