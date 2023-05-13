const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    // optionId belongs to an event (eventId)
    // Events have an array of options, each option have name and _id fields
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    optionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
