const express = require('express');
const app = express();
app.use(express.json());

const { createOrder } = require('./boundedContexts/orderProcessing');
const { addReview } = require('./boundedContexts/customerReviews');
const {
  updateRecommendation,
} = require('./boundedContexts/recommendationSystem');

// Update the order and review endpoints to include recommendation updates
app.post('/order', (req, res) => {
  createOrder(req, res);
  // Assuming you want to mark the book as not recommended after an order is placed
  updateRecommendation(req.body.bookId, false);
});

app.post('/reviews', (req, res) => {
  addReview(req, res);
  // Similarly, assuming you want to update the recommendation status after a review is added
  updateRecommendation(req.body.bookId, false);
});

// Server setup
const PORT = 0;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Export the Express app
