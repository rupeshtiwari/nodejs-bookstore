const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../../.env' }); // Ensure this path correctly points to your .env file

// Middleware to verify JWT token
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Check if token was not provided
  if (!token) {
    console.error('JWT Verification Error: No JWT token provided.');
    return res
      .status(401)
      .json({ message: 'Authentication failed: No token provided.' });
  }

  // Verify the provided JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err.message);
      // Customize error message based on the type of JWT error
      let errorMessage = 'Authentication failed: Invalid token.';
      if (err.name === 'TokenExpiredError') {
        errorMessage = 'Authentication failed: Token has expired.';
      } else if (err.name === 'JsonWebTokenError') {
        errorMessage = 'Authentication failed: The token is malformed.';
      } else if (err.name === 'NotBeforeError') {
        errorMessage = 'Authentication failed: Token not active.';
      }
      return res.status(403).json({ message: errorMessage });
    }
    // Token is valid, attach decoded user to request object
    req.user = decoded;
    next();
  });
};
