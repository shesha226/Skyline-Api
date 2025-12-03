const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


exports.authMiddleware = (req, res, next) => {
    try {
      const header = req.headers['authorization'];
        if(!header) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }
        const token = header.split(' ')[1];
        const verified = jwt.verify(token, JWT_SECRET);

        req.user = verified;
        next();
    }catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

//Admin only
exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
};


