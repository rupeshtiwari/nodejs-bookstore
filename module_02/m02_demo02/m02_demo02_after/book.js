class Book {
  constructor(isbn, title, stock, basePrice) {
    this.isbn = isbn;
    this.title = title;
    this.stock = stock;
    this.basePrice = basePrice;
  }

  updateStock(quantity) {
    if (this.stock < quantity) {
      throw new Error('Insufficient stock');
    }
    this.stock -= quantity;
  }

  getFinalPrice() {
    return this.basePrice; // Simple return for demonstration
  }
}

module.exports = Book; // Adjusted to CommonJS export
