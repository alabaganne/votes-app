require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const PORT = 3001;
const cors = require('cors');
const authMiddleware = require('../auth-middleware');

app.use(authMiddleware);
app.use(bodyParser.json());
app.use(cors());

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
}
main().catch((err) =>
    console.log('Failed to connect to MongoDB with error:', err)
);

app.get('/', function (req, res) {
    // Only admins are able to view all votes
    if (req.auth.isAdmin) {
        Vote.find({}, function (err, votes) {
            if (err) {
                res.status(500).send('Error');
            } else {
                res.send(votes);
            }
        });
    } else {
        res.status(403).send('Forbidden');
    }
});

app.post('/', async (req, res) => {
    // users can vote
    const userId = req.auth.userId;
    const { eventId, optionId } = req.body;

    if (eventId && optionId) {
        const vote = new Vote({
            eventId,
            optionId,
            userId,
        });

        await vote.save();

        res.status(201).send('Vote saved');
    } else {
        res.status(422).send('Invalid data');
    }
});

app.listen(PORT, function () {
    console.log(`Votes service is listening on port ${PORT}!`);
});
