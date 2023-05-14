const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const authMiddleware = require('../auth-middleware')(axios);
const cors = require('cors');
const PORT = 3003;
const eventsServiceUrl = 'http://localhost:3001',
    votesServiceUrl = 'http://localhost:3002';

const app = express();

app.use(bodyParser.json());
app.use(cors());

function votesByOptionId(votes) {
    let result = {};
    for (let i = 0; i < votes.length; i++) {
        const vote = votes[i];
        if (!result[vote.optionId]) {
            result[vote.optionId] = 0;
        }
        result[vote.optionId]++;
    }

    return result;
}



function getVotes() {
    return axios({
        method: 'get',
        url: `${votesServiceUrl}/`,
    })
        .then(function (response) {
            console.log('votes response', response.data);
            return response.data;
        })
        .catch(function (err) {
            console.log(err);
            return [];
        });
}

function getEvents() {
    return axios({
        method: 'get',
        url: `${eventsServiceUrl}/`,
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function (err) {
            console.log(err);
            return [];
        });
}
