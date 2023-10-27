const express = require('express');
const db = require('./db');
const bookService = express();

bookService.use(express.json());

// Endpoint to fetch all books
bookService.get('/books', (req, res) => {
  const books = db.fetchAllBooks();
  res.json(books);
});

// Endpoint to create a new book
bookService.post('/createBook', (req, res) => {
  const { title, author, price } = req.body;
  if (!title || !author || !price) {
    return res.status(400).send({ message: 'Missing required fields' });
  }
  const book = {
    id: Date.now(),
    title,
    author,
    price,
  };
  db.saveBook(book);
  res.status(201).send(book);
});

bookService.listen(3001, () => {
  console.log('Book Service started on port 3001');
});
