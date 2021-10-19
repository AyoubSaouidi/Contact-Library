const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from Headers
    const token = req.header('x-auth-token');

    // Check if no Token
    if (!token) {
        return res.status(401).json({ msg: 'No Token, authorization denied' });
    }

    try {
        // Verify Token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};