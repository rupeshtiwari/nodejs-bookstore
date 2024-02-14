// recommendation.js
const { isValidISBN } = require('./helper');

class Recommendation {
  constructor(isbn, recommended) {
    if (!isValidISBN(isbn)) throw new Error('Invalid ISBN format.');
    this.isbn = isbn;
    this.recommended = recommended;
  }
}

module.exports = Recommendation;
