const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }

        req.auth = {
            userId: user.userId,
            isAdmin: user.isAdmin,
        };

        next();
    });
}

module.exports = authMiddleware;
