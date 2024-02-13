class BookRepository {
  constructor() {
    this.books = new Map();
  }

  addBook(book) {
    this.books.set(book.isbn, book);
  }

  getBook(isbn) {
    return this.books.get(isbn);
  }
}

module.exports = {BookRepository}; // Adjusted to CommonJS export
