const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_ACCESS_SECRET;

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    console.log('Request headers:', req.headers); // Логування заголовків запиту

    if (!token) {
        return res.status(401).json({ error: 'Authorization token is missing' });
    }

    jwt.verify(token.split(' ')[1], SECRET, (err, decoded) => {
        console.log('Decoded token:', decoded);
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = req.user || {};
        req.user.id = decoded.id;
        req.decodedToken = decoded;

        next();
    });
}

module.exports = {
    verifyToken
}