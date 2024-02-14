// BookRepository.js
class BookRepository {
  constructor() {
    this.books = [];
    this.nextId = 1;
  }

  add(book) {
    book.id = this.nextId++;
    this.books.push(book);
    return book;
  }

  findByIsbn(isbn) {
    return this.books.find((book) => book.isbn === isbn);
  }
}

module.exports = BookRepository;
