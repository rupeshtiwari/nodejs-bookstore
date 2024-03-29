const express = require('express');
const bodyParser = require('body-parser');

// Set up express app
const app = express();
app.use(bodyParser.json());

// Sample users database
const users = [
  { id: 1, username: 'user1', password: 'pass1' },
  // ... other users
];

// Authentication route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({ message: 'Login successful!', userId: user.id });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Define the port to run the authentication service
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
