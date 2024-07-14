const jwt = require('jsonwebtoken');
const JWT_SECRET = "ThisIsAJWTSecretKey";

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({message: "Access denied, no token provided"});

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({message: "Invalid token"});
    }
};
