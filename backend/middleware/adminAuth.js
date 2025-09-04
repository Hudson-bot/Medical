// middleware/adminAuth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Please authenticate' });
    }
    
    // Check if user is an admin
    if (user.role !== 'Admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = adminAuth;