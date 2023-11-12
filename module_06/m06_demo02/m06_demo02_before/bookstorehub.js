const express = require('express');
// In-memory database
const { orders, payments, rewards, orderHistory } = require('./db');
const app = express();
app.use(express.json());

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
  const points = calculateRewardPoints(total);
  rewards[userId] = (rewards[userId] || 0) + points;

  // Process payment (simplified for this example)
  addPayment(userId, orderId, total);

  res.status(201).send({ message: 'Order created', order: newOrder, points });
});

// Retrieve order history
app.get('/order-history/:userId', (req, res) => {
  const userOrders = orderHistory[req.params.userId];
  if (userOrders) {
    res.status(200).json(userOrders);
  } else {
    res.status(404).send('User order history not found.');
  }
});

// Retrieve user rewards
app.get('/rewards/:userId', (req, res) => {
  const userRewards = rewards[req.params.userId];
  if (userRewards !== undefined) {
    res.status(200).json({ userId: req.params.userId, points: userRewards });
  } else {
    res.status(404).send('User rewards not found.');
  }
});

// Retrieve payment info
app.get('/payment/:orderId', (req, res) => {
  const paymentInfo = payments[req.params.orderId];
  if (paymentInfo) {
    res.status(200).json(paymentInfo);
  } else {
    res.status(404).send('Payment information not found.');
  }
});

const PORT = 3020;
app.listen(PORT, () => {
  console.log(`BookStoreHub Monolith running on port ${PORT}`);
});
