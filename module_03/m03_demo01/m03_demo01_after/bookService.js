const express = require('express');
const bookService = express();

bookService.get('/books', (req, res) => {
  // Fetch books logic
});

bookService.listen(3001, () => {
  console.log('Book Service started on port 3001');
});
