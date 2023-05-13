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
    },
    endDate: {
        // Last day to vote
        type: Date,
        required: true,
    },
    regionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
