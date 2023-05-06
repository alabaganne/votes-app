const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    eventId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: Number,
        required: true,
    },
    optionId: {
        type: Number,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
