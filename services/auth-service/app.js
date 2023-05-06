const express = require('express');
const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const URI = 'mongodb://localhost:27017/vote-auth-db';

const ACCESS_TOKEN_SECRET = 'secret';

const database = new MongoClient(URI, {
    useUnifiedTopology: true,
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = { username, password: hashedPassword };

    database.collection('users').insertOne(user, (err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: 'User was registered successfully' });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    database.collection('users').findOne({ username }, (err, user) => {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!result) {
                res.status(401).send({ message: 'Invalid password' });
                return;
            }

            const token = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
                expiresIn: '1h',
            });

            res.send({ token });
        });
    });
});

app.post('/validate-token', (req, res) => {
    const token = req.headers['Authorization'];

    if (!token) {
        res.status(401).send({ message: 'No token provided' });
        return;
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).send({ message: 'Invalid token' });
            return;
        }

        res.send({ message: 'Token is valid' });
    });
});

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});
