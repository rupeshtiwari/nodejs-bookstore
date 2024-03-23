const jwt = require('jsonwebtoken');
 
 
require('dotenv').config({ path: '../../../.env' });
console.log('The secret is:', process.env.JWT_SECRET);

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        return res.status(403).json({ message: 'Token is not valid' });
      }
      req.user = user;
      next();
    });``
  } catch (error) {
    res.status(500).json({ message: 'Server error validating token' });
  }
};
