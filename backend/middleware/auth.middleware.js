const jwt = require('jsonwebtoken');
const JWT_SECRET = "ThisIsAJWTSecretKey";

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Retrieve token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;  // Attach decoded user info (like id and role) to req.user
        next();  // Pass control to the next middleware or route handler
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: "Token expired" });
        }
        return res.status(400).json({ message: "Invalid token" });
    }
};
