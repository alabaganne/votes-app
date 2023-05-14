require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const PORT = 3002;
const cors = require('cors');
const authMiddleware = require('../auth-middleware')(axios);

const Vote = require('./Vote');

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

app.get('/', authMiddleware, async function (req, res) {
    // Only admins are able to view all votes
    let votes;
    if (req.auth.isAdmin) {
        votes = await Vote.find();

        res.send(votes);
    } else {
        const { userId } = req.auth;
        console.log('userId', userId);
        votes = await Vote.find({ userId });

        res.send(votes);
    }
});

app.post('/', authMiddleware, async (req, res) => {
    // users can vote
    const userId = req.auth.userId;
    const { eventId, optionId } = req.body;

    if (eventId || optionId) {
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

// Delete votes using eventId
app.delete('/events/:eventId', async (req, res) => {
    // if (!req.auth.isAdmin) {
    //     return res.status(403).send('Forbidden');
    // }

    try {
        await Vote.deleteMany({ eventId: req.params.eventId });
    } catch (err) {
        console.log('Vote not found');
    }

    res.send('Votes deleted');
});

app.delete('/votes/:voteId', authMiddleware, async (req, res) => {
    const vote = await Vote.findOne({ _id: req.params.voteId });

    if (vote.userId == req.auth.userId || req.auth.isAdmin) {
        try {
            await Vote.deleteOne({ _id: req.params.voteId });
        } catch (err) {
            return res.status(200).send('Vote not found');
        }

        res.send('Vote deleted');
    } else {
        return res.status(403).send('Forbidden');
    }
});

app.listen(PORT, function () {
    console.log(`Votes service is listening on port ${PORT}!`);
});
