const Book = require('./entities/book');
const Category = require('./entities/category');

class InventoryService {
  constructor() {
    this.categories = [];
  }

  addBook(isbn, title, author, price, stock, genre) {
    let category = this.findCategory(genre);
    if (!category) {
      category = new Category(genre);
      this.categories.push(category);
    }
    try {
      const book = new Book(isbn, title, author, price, stock);
      category.addBook(book);
    } catch (error) {
      console.error(error.message);
    }
  }

  updateBookPrice(isbn, newPrice) {
    const book = this.findBook(isbn);
    if (book) {
      try {
        book.setPrice(newPrice);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.error(`Book with ISBN '${isbn}' not found.`);
    }
  }

  // Helper methods to find a book or category
  findBook(isbn) {
    for (const category of this.categories) {
      const book = category.books.find((book) => book.isbn === isbn);
      if (book) return book;
    }
    return null;
  }

  findCategory(genre) {
    return this.categories.find((category) => category.genre === genre);
  }
}

module.exports = InventoryService;
