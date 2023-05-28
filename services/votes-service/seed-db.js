// Events service is running on port 3001
// ! Make sure events service is running
require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Vote = require('./Vote');

let votesToInsert = [];

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Vote.deleteMany();

  // Get events from events service
  axios({
    method: 'get',
    url: 'http://localhost:3001/',
  })
    .then((res) => {
      const events = res.data;

      // Get 1 user from the users service to vote for events
      axios({
        method: 'get',
        url: 'http://localhost:3000/',
      }).then(async (res) => {
        const user = res.data[0];

        for (let i = 0; i < events.length - 1; i++) {
          let event = events[i];
          let option = event.options[0];

          if (event.regionId == user.regionId || event.regionId == null) {
            votesToInsert.push({
              userId: user._id,
              eventId: event._id,
              optionId: option._id,
            });
          }
        }

        await Vote.insertMany(votesToInsert);

        console.log('Votes inserted successfully');
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}
main();
