const express = require('express');
const router = express.Router();
const { generateToken } = require('../auth/jwtAuth');

// Simulated user database
const users = [
  { id: 1, username: 'admin', password: 'admin', role: 'admin' },

  { id: 2, username: 'customer', password: 'custpassword', role: 'customer' },

  { id: 3, username: 'editor', password: 'editorpassword', role: 'editor' },
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const token = generateToken(user);
  res.json({ token });
});

module.exports = router;
