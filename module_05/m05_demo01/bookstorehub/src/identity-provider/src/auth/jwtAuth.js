const jwt = require('jsonwebtoken');
 
 
require('dotenv').config({ path: '../../.env' }); // Adjust the relative path as necessary

console.log('The secret is:', process.env.JWT_SECRET);

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
