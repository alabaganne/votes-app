// This service will use data coming from events and votes services to calculate the results of the poll.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const authMiddleware = require('../auth-middleware')(axios);
const cors = require('cors');
const PORT = 3003;
const { eventsServiceUrl, votesServiceUrl } = require('../../urls');

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
}
main();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', authMiddleware, async function (req, res) {
    // Get all events from events service
});

function votesByEventId(votes) {
    for (let i = 0; i < votes.length; i++) {
        const vote = votes[i];
        if (!votesByEventId[vote.eventId]) {
            votesByEventId[vote.eventId] = [];
        }
        votesByEventId[vote.eventId].push(vote);
    }

    return votesByEventId;
}

// this function counts the votes for each event.options
app.get('/events/:eventId/', function (req, res) {
    // Get votes by eventId
    axios({
        url: `${votesServiceUrl}/${req.params.eventId}`,
    })
        .then(function (response) {
            const votes = response.data;

            // create votesByEventId map and send response
            res.send(votesByEventId(votes));
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send('Error');
        });
});

app.listen(PORT, function () {
    console.log(`Results service listening on port ${PORT}`);
});
