const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /follow/{userId}
// @desc    Check if current user is following the specified user
// @access  Private
router.get('/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId;
        const currentUserId = req.user.id;

        // Find current user
        const currentUser = await User.findById(currentUserId);

        if (!currentUser) {
            return res.status(200).json(false);
        }

        // Check if the target user exists
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(200).json(false);
        }

        // Check if target user is in the current user's following list
        const isFollowing = currentUser.following &&
            currentUser.following.some(id => id.toString() === userId.toString());

        // Return boolean result
        return res.status(200).json(isFollowing);

    } catch (err) {
        console.error(err.message);
        return res.status(200).json(false);
    }
});

// @route   POST /follow/{userId}
// @desc    Follow a user
// @access  Private
router.post('/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId;
        const currentUserId = req.user.id;

        // Check if trying to follow self
        if (userId === currentUserId) {
            return res.status(200).json({
                resultCode: 1,
                messages: ['You cannot follow yourself'],
                data: {}
            });
        }

        // Find current user
        const currentUser = await User.findById(currentUserId);
        if (!currentUser) {
            return res.status(200).json({
                resultCode: 1,
                messages: ['Current user not found'],
                data: {}
            });
        }

        // Find target user
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(200).json({
                resultCode: 1,
                messages: ['User to follow not found'],
                data: {}
            });
        }

        // Check if already following
        if (currentUser.following && currentUser.following.some(id => id.toString() === userId.toString())) {
            return res.status(200).json({
                resultCode: 1,
                messages: ['You are already following this user'],
                data: {}
            });
        }

        // Add target user to current user's following
        if (!currentUser.following) {
            currentUser.following = [];
        }
        currentUser.following.push(userId);
        await currentUser.save();

        // Add current user to target user's followers
        if (!targetUser.followers) {
            targetUser.followers = [];
        }
        targetUser.followers.push(currentUserId);
        await targetUser.save();

        // Return success
        return res.status(200).json({
            resultCode: 0,
            messages: [],
            data: {}
        });

    } catch (err) {
        console.error(err.message);
        return res.status(200).json({
            resultCode: 1,
            messages: ['Server error'],
            data: {}
        });
    }
});

// @route   DELETE /follow/{userId}
// @desc    Unfollow a user
// @access  Private
router.delete('/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId;
        const currentUserId = req.user.id;

        // Find current user
        const currentUser = await User.findById(currentUserId);
        if (!currentUser) {
            return res.status(200).json({
                resultCode: 1,
                messages: ['Current user not found'],
                data: {}
            });
        }

        // Find target user
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(200).json({
                resultCode: 1,
                messages: ['User to unfollow not found'],
                data: {}
            });
        }

        // Check if not following
        if (!currentUser.following || !currentUser.following.some(id => id.toString() === userId.toString())) {
            return res.status(200).json({
                resultCode: 1,
                messages: ['You are not following this user'],
                data: {}
            });
        }

        // Remove target user from current user's following
        currentUser.following = currentUser.following.filter(id => id.toString() !== userId.toString());
        await currentUser.save();

        // Remove current user from target user's followers
        if (targetUser.followers) {
            targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId.toString());
            await targetUser.save();
        }

        // Return success
        return res.status(200).json({
            resultCode: 0,
            messages: [],
            data: {}
        });

    } catch (err) {
        console.error(err.message);
        return res.status(200).json({
            resultCode: 1,
            messages: ['Server error'],
            data: {}
        });
    }
});

module.exports = router;