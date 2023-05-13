Services Ports
	Auth: 3000
	Events: 3001
	Votes: 3002
	Results: 3003


If you're using local mongoDB, to add data, make sure to change DB_CONNECTION_STRING in every .env file under the services
and from every service folder (except results folder):
1) users-service
2) events-service
3) votes-service
Run: node seed-db.js

NOTE: order matters!
