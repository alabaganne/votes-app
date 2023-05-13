require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Event = require('./Event');
const PORT = 3001;
const axios = require('axios');
const authMiddleware = require('../auth-middleware')(axios);

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
}

main().catch((err) =>
    console.log('Failed to connect to MongoDB with error:', err)
);

app.use(bodyParser.json());
app.use(cors());

// Get events list from MongoDB
app.get('/', async function (req, res) {
    let events = await Event.find();

    res.send(events);
});

// Only admins can create events
app.post('/', authMiddleware, async function (req, res) {
    if (!req.auth.isAdmin) {
        return res.status(403).send('Forbidden');
    }

    const { name, description, options, endDate } = req.body;

    if (name && options && endDate) {
        if (options.length < 2) {
            return res
                .status(422)
                .send('options array must contain at least 2 items');
        }

        const event = new Event({
            name,
            description,
            options,
            endDate,
        });

        await event.save();

        res.status(201).send('Event saved');
    } else {
        res.status(422).send('Missing data');
    }
});

app.delete('/:eventId', authMiddleware, (req, res) => {
    // Send axios request to delete votes using eventId
    // Use mongoose to delete events list
    if (req.auth.isAdmin == false) return res.status(403).send('Forbidden');

    axios({
        method: 'delete',
        url: `http://localhost:3002/${req.params.eventId}`,
        headers: {
            Authorization: req.get('Authorization'),
        },
    })
        .then(async (axiosResponse) => {
            if (axiosResponse.status == 200) {
                await Event.deleteOne({ _id: req.params.eventId });

                res.status(200).send('Event deleted');
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send('Error deleting event');
        });
});

app.listen(PORT, function () {
    console.log(`Events service listening on port ${PORT}`);
});
