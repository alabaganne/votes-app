module.exports = function (axios) {
    return function authMiddleware(req, res, next) {
        const authHeader = req.get('Authorization');

        if (!authHeader) {
            return res.status(401).send('Unauthorized');
        }

        const token = authHeader.split(' ')[1];

        // Send token to auth service to verify
        axios
            .post('http://localhost:3000/verify', { token })
            .then((axiosResponse) => {
                if (
                    axiosResponse.status != 200 ||
                    axiosResponse.data.tokenValid == false
                ) {
                    return res.status(401).send('Unauthorized');
                }

                req.auth = {
                    userId: axiosResponse.data.userId,
                    isAdmin: axiosResponse.data.isAdmin,
                };

                next();
            })
            .catch((err) => {
                console.log(err);
                return res.status(401).send('Error verifying token');
            });
    };
};
