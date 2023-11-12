const express = require('express');
const app = express();
app.use(express.json());

// In-memory database
const { orders, payments, rewards, orderHistory } = require('./db');

// Utility functions
const calculateRewardPoints = (total) => {
  return total >= 100 ? Math.floor(total / 100) * 10 : 0;
};

const addPayment = (userId, orderId, amount) => {
  payments[orderId] = { userId, amount };
};

// Order handling
app.post('/order', (req, res) => {
  const { userId, items } = req.body;
  const total = items.reduce((acc, item) => acc + item.price, 0);
  const orderId = Date.now();

  // Create order
  const newOrder = { orderId, userId, items, total };
  orders.push(newOrder);

  // Update order history
  if (!orderHistory[userId]) orderHistory[userId] = [];
  orderHistory[userId].push(newOrder);

  // Calculate rewards
  //TODO: This rewards calculation logic would be REMOVED during refactoring
  const points = calculateRewardPoints(total);
  rewards[userId] = (rewards[userId] || 0) + points; //TODO: DELETED during refactoring

  // Process payment (simplified for this example)
  addPayment(userId, orderId, total);

  // The response would be UPDATED to remove the points calculation
  res.status(201).send({ message: 'Order created', order: newOrder }); //TODO: UPDATED: Removed 'points' from the response
});

// Other routes remain unchanged...

const PORT = 3020;
app.listen(PORT, () => {
  console.log(`BookStoreHub Monolith running on port ${PORT}`);
});
