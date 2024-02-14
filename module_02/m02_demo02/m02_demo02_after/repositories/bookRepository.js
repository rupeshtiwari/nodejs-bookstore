class BookRepository {
  constructor() {
    this.books = [];
  }

  add(book) {
    this.books.push(book);
  }

  findByIsbn(isbn) {
    return this.books.find((book) => book.isbn === isbn);
  }

  // Include methods for updating and deleting books as needed
}

module.exports = BookRepository;
