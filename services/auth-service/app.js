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
const authMiddleware = require('../auth-middleware');
const Region = require('./Region');

app.use(cors());
app.use(bodyParser.json());

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
}
main();

// ? This route is responsible for creating users, authenticating users, adding and deleting regions AND verifying tokens

app.post('/create-user', authMiddleware, (req, res) => {
    if (!req.auth.isAdmin) return res.status(403).send('Forbidden');

    const { CIN, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ CIN, password: hashedPassword });

    user.save();

    res.status(201).send('User saved');
});

app.post('/login', (req, res) => {
    const { CIN, password } = req.body;

    User.findOne({ CIN }, (err, user) => {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!result) {
                res.status(401).send({ message: 'Invalid password' });
                return;
            }

            const token = jwt.sign(
                { userId: user._id, isAdmin: user.isAdmin },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '24h',
                }
            );

            res.send({ token });
        });
    });
});

// Recieve token from other services/"epxress servers" in request.post.token and verify it
app.post('/verify', (req, res) => {
    const token = req.headers['Authorization'];

    if (!token) {
        res.status(401).send({ message: 'No token provided' });
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).send('Invalid token');
            return;
        }

        res.send('Token is valid');
    });
});

app.post('/region', authMiddleware, async (req, res) => {
    const { name } = req.body;

    if (!req.auth.isAdmin) return res.status(403).send('Forbidden');

    const region = new Region({ name });

    await region.save();

    res.status(201).send('Region saved');
});

app.delete('/region/:name', authMiddleware, async (req, res) => {
    const { name } = req.params;

    if (!req.auth.isAdmin) return res.status(403).send('Forbidden');

    try {
        await Region.deleteOne({ name: name });

        res.send('Region deleted');
    } catch (err) {
        console.log(err);
        res.status(400).send('Error deleting region');
    }
});

app.listen(PORT, () => {
    console.log('Auth service is listening on port ' + PORT);
});
