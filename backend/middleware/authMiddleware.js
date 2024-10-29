const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/config'); // Ensure to store JWT secret securely

// Middleware function to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if the token is present in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];

      // Verify the token and extract user ID
      const decoded = jwt.verify(token, jwtSecret);

      // Find the user by decoded ID, without password
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware or route
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Middleware to restrict access to admin users
const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied, admin only' });
  }
};

// Middleware to restrict access to instructors
const instructorOnly = (req, res, next) => {
  if (req.user && req.user.isInstructor) {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied, instructor only' });
  }
};

module.exports = { protect, adminOnly, instructorOnly };