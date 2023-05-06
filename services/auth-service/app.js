const express = require('express');
const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./User');

app.use(cors());
app.use(bodyParser.json());

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
}
main();

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, password: hashedPassword });

    user.save();

    res.status(201).send('User saved');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }, (err, user) => {
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
            res.status(403).send({ message: 'Invalid token' });
            return;
        }

        res.send({ message: 'Token is valid' });
    });
});

app.listen(PORT, () => {
    console.log('Auth service is listening on port ' + PORT);
});
