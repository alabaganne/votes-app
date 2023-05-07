// This service will use data coming from events and votes services to calculate the results of the poll.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authMiddleware = require('../auth-middleware');
const cors = require('cors');
const PORT = 3003;

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

app.get('/events/:eventId/', function (req, res) {
    // Get votes by eventId
    axios({
        url: `${eventsServiceUrl}/${req.params.eventId}`,
    });
    // create votesByEventId map
    // Send response
});

app.listen(PORT, function () {
    console.log(`Results service listening on port ${PORT}`);
});
