// book.js
const { isValidISBN } = require('./helper');

class Book {
  constructor(isbn, price, stock) {
    if (!isValidISBN(isbn)) throw new Error('Invalid ISBN format.');
    this.isbn = isbn;

    if (price < 0) throw new Error('Price must be positive.');
    this.price = price;

    this.stock = stock;
  }
}

module.exports = Book;
