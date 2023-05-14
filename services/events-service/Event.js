const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    options: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
            },
            name: {
                type: String,
                required: true,
            },
        },
    ],
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        // Last day to vote
        type: Date,
        // Default to 1 week from now
        default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    },
    regionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
