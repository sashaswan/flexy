const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from cookie
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
        return res.status(200).json({
            resultCode: 1,
            messages: ['You are not authorized'],
            fieldsErrors: [],
            data: {}
        });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(200).json({
            resultCode: 1,
            messages: ['Token is not valid'],
            fieldsErrors: [],
            data: {}
        });
    }
};