const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3004;

// Middleware for parsing request bodies
app.use(bodyParser.json());

// Simulated database of users
const users = [
  { id: 1, username: 'user1', password: 'pass1' },
  { id: 2, username: 'user2', password: 'pass2' },
];

// Authentication endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).send({ message: 'Login successful!' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Other endpoints representing different parts of the monolith would go here
app.get('/books', (req, res) => {
  // Logic to return a list of books
  res.json([
    { id: 1, title: 'Book One' },
    { id: 2, title: 'Book Two' },
  ]);
});
app.get('/', (req, res) => {
  res.send('Welcome to BookStoreHub!');
});

// Start the server
app.listen(port, () => {
  console.log(`BookStoreHub app listening at http://localhost:${port}`);
});
