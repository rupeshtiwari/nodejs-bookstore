const Book = require('./book');

class Category {
  constructor(genre) {
    this.genre = genre;
    this.books = [];
  }

  addBook(book) {
    if (!(book instanceof Book)) throw new Error('Invalid book.');
    this.books.push(book);
  }

  findBook(isbn) {
    return this.books.find((book) => book.isbn === isbn);
  }
}
module.exports = Category;