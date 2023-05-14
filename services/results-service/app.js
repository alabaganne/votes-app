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