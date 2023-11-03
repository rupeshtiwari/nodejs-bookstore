const jwt = require('jsonwebtoken');
const SECRET_KEY = 'bookStoreSecret';

function generateToken(user) {
  return jwt.sign({ userId: user.username }, SECRET_KEY, { expiresIn: '1h' });
}

function validateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access Token Required');

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send('Invalid Access Token');
    req.user = user;
    next();
  });
}

module.exports = {
  generateToken,
  validateToken,
};
