const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3010;

app.use(bodyParser.json());

app.post('/addUser', (req, res) => {
  const { username, password, settings } = req.body;
  db.addUser({ username, password, settings });
  res.status(201).send('User added successfully');
});

// Anyone can fetch user's settings
app.get('/userSettings/:username', (req, res) => {
  const user = db.getUser(req.params.username);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user.settings);
});
 

app.listen(PORT, () => {
  console.log(
    `UserService without authentication running on http://localhost:${PORT}`
  );
});
