const express = require('express');
const app = express();
app.use(express.json());

// Mock databases for simplicity
let orders = [];
let books = [
  {
    bookId: 'B1001',
    title: 'Space Odyssey',
    price: 25,
    genre: 'Sci-Fi',
    stock: 10,
  },
  {
    bookId: 'B1002',
    title: 'Mystery Mansion',
    price: 20,
    genre: 'Mystery',
    stock: 5,
  },
];
let reviews = [];
let recommendations = [
  { bookId: 'B1001', recommended: true },
  { bookId: 'B1002', recommended: true },
];

// Order Processing
app.post('/order', (req, res) => {
  const { customerId, bookId, quantity } = req.body;
  const book = books.find((book) => book.bookId === bookId);
  if (book && book.stock >= quantity) {
    // Reduce stock
    book.stock -= quantity;
    // Calculate the total price
    const totalPrice = book.price * quantity;
    // Create order
    const orderId = `ORD-${Math.random().toString(16).slice(2)}`;
    orders.push({
      orderId,
      customerId,
      bookId,
      quantity,
      price: totalPrice,
      status: 'Confirmed',
    });

    res.json({
      message: 'Order placed successfully',
      orderId,
      status: 'Confirmed',
    });
    // Update recommendations after order
    recommendations.find((r) => r.bookId === bookId).recommended = false;
  } else {
    res.status(400).json({ message: 'Book unavailable or insufficient stock' });
  }
});

// Customer Reviews
app.post('/reviews', (req, res) => {
  const { bookId, review, rating } = req.body;

  // Post a review
  reviews.push({ bookId, review, rating });

  // Update recommendation algorithm
  recommendations.find((r) => r.bookId === bookId).recommended = false;

  res.json({ message: 'Review added successfully', bookId });
});

// Server setup
const PORT = 0;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app; // Export the Express app