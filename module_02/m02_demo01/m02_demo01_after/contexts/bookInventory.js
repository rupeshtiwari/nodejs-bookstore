let books = [
  {
    bookId: 'B1001',
    title: 'Space Odyssey',
    price: 25,
    genre: 'Sci-Fi',
    stock: 10,
  },
  {
    bookId: 'B1002',
    title: 'Mystery Mansion',
    price: 20,
    genre: 'Mystery',
    stock: 5,
  },
];

function checkStock(bookId, quantity) {
  const book = books.find((book) => book.bookId === bookId);
  return book && book.stock >= quantity;
}

function updateStock(bookId, quantity) {
  const book = books.find((book) => book.bookId === bookId);
  if (book) {
    book.stock -= quantity;
  }
}

function getBookDetails(bookId) {
  const book = books.find((book) => book.bookId === bookId);
  return book ? { ...book } : null; // Return a copy to prevent direct manipulation
}

// Added for testing purposes to inspect the stock level of a book
function getStockForTest(bookId) {
  const book = books.find((book) => book.bookId === bookId);
  return book ? book.stock : null;
}

module.exports = { checkStock, updateStock, getBookDetails, getStockForTest };
