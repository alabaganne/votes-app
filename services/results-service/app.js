const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const authMiddleware = require('./auth-middleware')(axios);
const cors = require('cors');
const votesServiceUrl = 'http://votes-app__votes-service:3002';
const PORT = 3003;

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

function getVotes(req) {
  return axios({
    method: 'get',
    url: `${votesServiceUrl}/`,
    headers: {
      authorization: req.get('Authorization'),
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (err) {
      if (err.response?.status) {
        console.log('Unauthorized');
      }
      console.log(err);
      return [];
    });
}

app.get(
  '/',
  /* authMiddleware , */ async function (req, res) {
    let votes = await getVotes(req); // a vote have eventId and optionId and userId

    res.send(votesByOptionId(votes));
  }
);
// this function counts the votes for each event.options
app.get('/events/:eventId/', function (req, res) {
  // Get votes by eventId
  axios({
    url: `${votesServiceUrl}/${req.params.eventId}`,
    method: 'get',
    headers: {
      authorization: req.get('Authorization'),
    },
  })
    .then(function (response) {
      const votes = response.data;

      // create votesByOptionId map and send response
      res.send(votesByOptionId(votes));
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send('Error');
    });
});

app.listen(PORT, function () {
  console.log(`Results service listening on port ${PORT}`);
});
