const BookRepository = require('./bookRepository'); // Adjusted to CommonJS import

class InventoryService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  sellBook(isbn, quantity) {
    const book = this.bookRepository.getBook(isbn);
    if (!book) {
      throw new Error('Book not found');
    }
    book.updateStock(quantity); // This might throw if insufficient stock
    return book.getFinalPrice() * quantity;
  }
}

module.exports = {InventoryService}; // Adjusted to CommonJS export
