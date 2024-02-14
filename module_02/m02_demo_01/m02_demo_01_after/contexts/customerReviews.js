let reviews = [];

function addReview(bookId, review, rating) {
  reviews.push({ bookId, review, rating });
  return { message: 'Review added successfully', bookId };
}

module.exports = { addReview };
