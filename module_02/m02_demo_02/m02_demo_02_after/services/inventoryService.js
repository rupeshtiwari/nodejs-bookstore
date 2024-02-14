const Category = require('../models/category');
const Book = require('../models/book');

class InventoryService {
  constructor(bookRepository, categoryRepository) {
    this.bookRepository = bookRepository;
    this.categoryRepository = categoryRepository;
  }

  addBook({ isbn, title, author, price, stock, genre }) {
    const book = new Book(isbn, title, author, price, stock);
    this.bookRepository.add(book);

    let category = this.categoryRepository.findByGenre(genre);
    if (!category) {
      category = new Category(genre);
      this.categoryRepository.add(category);
    }
    category.addBook(book);
  }

  updateBookPrice(isbn, newPrice) {
    const book = this.bookRepository.findByIsbn(isbn);
    if (!book) throw new Error(`Book with ISBN '${isbn}' not found.`);
    book.setPrice(newPrice);
  }

  updateBookStock(isbn, newStock) {
    const book = this.bookRepository.findByIsbn(isbn);
    if (!book) throw new Error(`Book with ISBN '${isbn}' not found.`);
    book.setStock(newStock);
  }
}
module.exports = InventoryService;