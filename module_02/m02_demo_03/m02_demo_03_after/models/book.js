const ISBN = require('../value-objects/isbn');
const Price = require('../value-objects/price');

class Book {
  constructor(isbn, price, stock) {
    this.isbn = new ISBN(isbn); // Use ISBN value object
    this.price = new Price(price); // Use Price value object
    this.stock = stock;
  }
}
module.exports = Book;
