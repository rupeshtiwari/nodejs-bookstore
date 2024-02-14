class Book {
  constructor(isbn, title, author, price, stock) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.setPrice(price);
    this.setStock(stock);
  }

  setPrice(price) {
    if (price < 0) throw new Error('Price must be positive.');
    this.price = price;
  }

  setStock(stock) {
    if (stock < 0) throw new Error('Stock must be positive.');
    this.stock = stock;
  }
}
module.exports = Book;