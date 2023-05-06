const axios = require('axios');

function authMiddleware(req, res, next) {
    const token = req.headers['Authorization'];

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    // Send token to auth service to verify
    axios
        .post('http://localhost:3001/verify', { token })
        .then((response) => {
            if (response.status !== 200) {
                return res.status(401).send('Unauthorized');
            }

            req.auth = {
                userId: response.data.userId,
                isAdmin: response.data.isAdmin,
            };

            next();
        })
        .catch((err) => {
            // Token is not valid
            return res.status(401).send('Unauthorized');
        });
}

module.exports = authMiddleware;
