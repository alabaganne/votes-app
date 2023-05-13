const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unique: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    CIN: {
        type: String,
        required: true,
        unique: true,
    },
    regionId: {
        // 12 regions
        // "monastir", "sfax", "sousse", "tunis", "gabes", etc...
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
