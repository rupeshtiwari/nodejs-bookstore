const express = require('express');
const bodyParser = require('body-parser');
const https = require('https'); // Newly added to enable HTTPS
const fs = require('fs'); // Required for reading the SSL files
const db = require('../utils/db');
const jwtHelper = require('../utils/jwtHelper');
const PORT = 3010;

// HTTPS credentials
// These are the SSL files you generated for HTTPS communication
// Specify TLSv1.3 as the secure protocol in your HTTPS options.
const credentials = {
  key: fs.readFileSync('../utils/key.pem'),
  cert: fs.readFileSync('../utils/cert.pem'),
  minVersion: 'TLSv1.3', // Ensure that the minimum version is set to TLSv1.3
};

const app = express();
app.use(bodyParser.json());

// User registration endpoint remains unchanged
app.post('/addUser', (req, res) => {
  const { username, password, settings } = req.body;
  db.addUser({ username, password, settings });
  res.status(201).send('User added successfully');
});

// User login endpoint remains unchanged
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.getUser(username);

  if (!user || user.password !== password) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwtHelper.generateToken(user);
  res.json({ token });
});

// Protected route using JWT for user settings, no changes here
app.get('/userSettings', jwtHelper.validateToken, (req, res) => {
  const user = db.getUser(req.user.userId);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user.settings);
});

// Creation of the HTTPS server using the credentials
// This is a new addition to secure our UserService with HTTPS
const httpsServer = https.createServer(credentials, app);


// Starting the server on HTTPS, modified from app.listen to httpsServer.listen
httpsServer.listen(PORT, () => {
  console.log(`Secure UserService with JWT validation running on port ${PORT}`);
});
