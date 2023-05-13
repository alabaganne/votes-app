require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./Event');
const axios = require('axios');

// This script will insert some events in the database.
const newEvents = [
    {
        name: 'Event 1',
        description: 'Event 1 description',
        options: [
            { _id: new mongoose.Types.ObjectId(), name: 'Event 1 Option 1' },
            { _id: new mongoose.Types.ObjectId(), name: 'Event 1 Option 2' },
            { _id: new mongoose.Types.ObjectId(), name: 'Event 1 Option 3' },
        ],
        startDate: new Date(),
        // endData is startDate + 1 week
        endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    },
    {
        name: 'Event 2',
        description: 'Event 2 description',
        options: [
            { _id: new mongoose.Types.ObjectId(), name: 'Event 2 Option 1' },
            { _id: new mongoose.Types.ObjectId(), name: 'Event 2 Option 2' },
            { _id: new mongoose.Types.ObjectId(), name: 'Event 2 Option 3' },
            { _id: new mongoose.Types.ObjectId(), name: 'Event 2 Option 4' },
        ],
        startDate: new Date(),
        // endData is startDate + 1 month
        endDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
    },
    {
        name: 'Event 3',
        description: 'Event 3 description',
        options: [
            { _id: new mongoose.Types.ObjectId(), name: 'Event 3 Option 1' },
            { _id: new mongoose.Types.ObjectId(), name: 'Event 3 Option 2' },
            { _id: new mongoose.Types.ObjectId(), name: 'Event 3 Option 3' },
        ],
        startDate: new Date(),
        // endData is startDate + 1 day
        endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    },

    {
        name: 'Event 4',
        description: 'Event 4 description',
        options: [
            { _id: new mongoose.Types.ObjectId(), name: 'Event 4 Option 1' },
            { _id: new mongoose.Types.ObjectId(), name: 'Event 4 Option 2' },
            { _id: new mongoose.Types.ObjectId(), name: 'Event 4 Option 3' },
        ],
        startDate: new Date(),
        // endData is startDate + 1 day
        endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    },

    {
        name: 'Event 5',
        description: 'Event 5 description',
        options: [
            { _id: new mongoose.Types.ObjectId(), name: 'Event 5 Option 1' },
            { _id: new mongoose.Types.ObjectId(), name: 'Event 5 Option 2' },
        ],
        startDate: new Date(),
        // endData is startDate + 1 day
        endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    },
];

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const events = await Event.find();

    if (events.length > 0) {
        console.log('Events already inserted');
        return;
    }

    // Assign regionId for each event
    axios({
        method: 'get',
        url: 'http://localhost:3000/regions',
    }).then(async ({ data }) => {
        let regions = data;
        for (let i = 0; i < newEvents.length; i++) {
            newEvents[i].regionId = regions[0]._id;
        }
        await Event.insertMany(newEvents);

        console.log('Events inserted successfully');

        return;
    });
}

main();
