// models/User.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Basic profile fields already added
    status: {
        type: String,
        default: null
    },
    photo: {
        small: {
            type: String,
            default: null
        },
        large: {
            type: String,
            default: null
        }
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        default: []
    },

    // New profile fields
    fullName: {
        type: String,
        default: ''
    },
    aboutMe: {
        type: String,
        default: ''
    },
    lookingForAJob: {
        type: Boolean,
        default: false
    },
    lookingForAJobDescription: {
        type: String,
        default: ''
    },
    contacts: {
        github: {
            type: String,
            default: ''
        },
        vk: {
            type: String,
            default: ''
        },
        facebook: {
            type: String,
            default: ''
        },
        instagram: {
            type: String,
            default: ''
        },
        twitter: {
            type: String,
            default: ''
        },
        website: {
            type: String,
            default: ''
        },
        youtube: {
            type: String,
            default: ''
        },
        mainLink: {
            type: String,
            default: ''
        }
    },

    date: {
        type: Date,
        default: Date.now
    },
    following: [String],
    followers: [String]
});

module.exports = mongoose.model('User', UserSchema);