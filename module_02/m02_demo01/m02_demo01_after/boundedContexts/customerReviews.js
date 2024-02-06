let reviews = [];

const addReview = (req, res) => {
  const { bookId, review, rating } = req.body;
  reviews.push({ bookId, review, rating });
  res.json({ message: 'Review added successfully', bookId });
};

module.exports = { reviews, addReview };
