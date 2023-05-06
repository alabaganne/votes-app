require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authMiddleware = require('../auth-middleware');
const cors = require('cors');
const Event = require('./Event');

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
app.get('/', function (req, res) {
    Event.find({}, function (err, events) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error getting events');
        }
        res.send(events);
    });
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
