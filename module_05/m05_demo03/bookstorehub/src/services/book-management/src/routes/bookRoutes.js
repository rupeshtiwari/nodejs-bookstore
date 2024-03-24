const express = require('express');
const router = express.Router();
const jwtVerify = require('../../../../common/auth/jwtVerfiy'); // Adjust path as necessary
const { checkAccess } = require('../middleware/rbac');
// Mock book database
const books = [
  { id: 1, title: 'Node.js Microservices', author: 'Jane Doe' },
  { id: 2, title: 'Advanced Node.js', author: 'John Smith' },
];

// Existing public route that lists all books
router.get('/', (req, res) => {
  res.json(books);
});

// route for getting book details without RBAC
// Still protected by JWT verification
router.get('/details/:id', jwtVerify, (req, res) => {
  const book = books.find(b => b.id.toString() === req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});


// JWT + RBAC
// Assuming a simple in -memory array for book storage
// Add a new book to the inventory (only accessible by users with the 'Editor' role)
router.post('/add', jwtVerify, checkAccess('editor', 'createAny', 'book'), (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1, // Simple ID generation strategy for demo purposes
    title,
    author,
  };
  books.push(newBook);
  res.status(201).json({ message: 'Book added successfully', book: newBook });
});

module.exports = router;