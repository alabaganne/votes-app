const urls = {
  userServiceUrl: 'http://localhost:3000',
  eventsServiceUrl: 'http://localhost:3001',
  votesServiceUrl: 'http://localhost:3002',
  resultsServiceUrl: 'http://localhost:3003',
};

// Running the app from inside a Docker container.
// If you want to run it in localhost, comment the urls below and uncomment the urls above.
// const urls = {
//   userServiceUrl: 'http://votes-app__users-service:3000',
//   eventsServiceUrl: 'http://votes-app__events-service:3001',
//   votesServiceUrl: 'http://votes-app__votes-service:3002',
//   resultsServiceUrl: 'http://votes-app__results-service:3003',
// };

export default urls;
