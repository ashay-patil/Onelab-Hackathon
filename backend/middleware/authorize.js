const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(decoded);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
    }
  };

module.exports = authorize;