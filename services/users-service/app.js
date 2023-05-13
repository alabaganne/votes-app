require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./User');
const Region = require('./Region');
const authMiddleware = require('./auth-middleware');

app.use(cors());
app.use(bodyParser.json());

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
}
main();

// Get users list from MongoDB
app.get('/', async (req, res) => {
    let users = await User.find();

    res.send(users);
});

// ? This route is responsible for creating users, authenticating users, adding and deleting regions AND verifying tokens
app.post('/', authMiddleware, (req, res) => {
    if (!req.auth.isAdmin) return res.status(403).send('Forbidden');

    const { CIN, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ CIN, password: hashedPassword });

    user.save();

    res.status(201).send('User saved');
});

app.post('/login', async (req, res) => {
    const { CIN, password } = req.body;

    let user = await User.findOne({ CIN });

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!result) {
            res.status(401).send({ message: 'Wrong credentials' });
            return;
        }

        user.password = null;

        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '30d',
            }
        );

        res.send({ token, user });
    });
});

// Recieve token from other services/"epxress servers" in request.post.token and verify it
app.post('/verify', (req, res) => {
    const token = req.body.token;

    if (!token) {
        res.send({ tokenValid: false });
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.send({
                tokenValid: false,
            });
        }

        console.log('user', user);
        res.send({
            tokenValid: true,
            userId: user.userId,
            isAdmin: user.isAdmin,
        });
    });
});

app.get('/regions', async (req, res) => {
    let regions = await Region.find();

    res.send(regions);
});

app.listen(PORT, () => {
    console.log('Users service is listening on port ' + PORT);
});
