const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getToken = (req) => {
  // Try to get token from cookie
  let token = req.cookies.jwt;

  // If token is not present in cookie, try to get it from header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    token = authHeader.split(' ')[1];
  }

  return token;
};

const authenticateUser = async (req, res, next) => {
  try {
    // Get token from cookie or header
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Verify token and get user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Get user by ID and check if exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Add user to request object
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateUser;
