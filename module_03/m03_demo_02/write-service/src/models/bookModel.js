// src/models/bookModel.js
class BookModel {
  static updateInventory(bookId, quantity) {
    // Simulate a database update
    console.log(
      `Updated inventory for book ${bookId} with quantity ${quantity}.`
    );
  }

  static addReview(bookId, review) {
    // Simulate adding a review
    console.log(`Added review for book ${bookId}: ${review}`);
  }
}

module.exports = BookModel;
