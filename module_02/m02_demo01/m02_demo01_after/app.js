const express = require('express');
const { createOrder } = require('./contexts/orderProcessing');
const { addReview } = require('./contexts/customerReviews');
const { updateRecommendation } = require('./contexts/recommendationSystem');

const app = express();
app.use(express.json());

// Order route
app.post('/order', (req, res) => {
  const result = createOrder(
    req.body.customerId,
    req.body.bookId,
    req.body.quantity
  );
  if (result.success) {
    updateRecommendation(req.body.bookId, false); // Adjust recommendation
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

// Review route
app.post('/reviews', (req, res) => {
  const result = addReview(req.body.bookId, req.body.review, req.body.rating);
  updateRecommendation(req.body.bookId, true); // Possibly adjust recommendation
  res.json(result);
});

module.exports = app; // Export the Express app for server.js to use
