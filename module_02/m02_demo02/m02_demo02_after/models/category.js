class Category {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    // Assuming book is an instance of Book
    this.books.push(book);
  }

  removeBook(isbn) {
    const bookIndex = this.books.findIndex((book) => book.isbn === isbn);
    if (bookIndex === -1) throw new Error('Book not found');
    this.books.splice(bookIndex, 1);
  }

  // Documenting aggregate-specific behavior
  findBook(isbn) {
    return this.books.find((book) => book.isbn === isbn);
  }
}

module.exports = Category;
