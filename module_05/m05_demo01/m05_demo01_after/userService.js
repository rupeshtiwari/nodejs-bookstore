const express = require('express');
const bodyParser = require('body-parser');
const db = require('../utils/db');
const jwtHelper = require('./jwtHelper');

const app = express();
app.use(bodyParser.json());

app.post('/addUser', (req, res) => {
  const { username, password, settings } = req.body;
  db.addUser({ username, password, settings });
  res.status(201).send('User added successfully');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.getUser(username);

  if (!user || user.password !== password) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwtHelper.generateToken(user);
  res.json({ token });
});

// Protected route to fetch user's settings
app.get('/userSettings', jwtHelper.validateToken, (req, res) => {
  const user = db.getUser(req.user.userId);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user.settings);
});

app.listen(3000, () => {
  console.log('UserService with JWT validation running on port 3000');
});
