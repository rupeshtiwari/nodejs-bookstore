const ISBN = require('../value-objects/isbn');

class Recommendation {
  constructor(isbn, recommended) {
    this.isbn = new ISBN(isbn); // Use ISBN value object
    this.recommended = recommended;
  }
}
module.exports = Recommendation;
