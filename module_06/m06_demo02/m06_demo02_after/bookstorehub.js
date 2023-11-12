const express = require('express');
const { orders, orderHistory, rewards } = require('./db');
const eventSubscriber = require('./eventSubscriber');
const eventPublisher = require('./eventPublisher');
const logger = require('../../../logger/logger');

const app = express();
app.use(express.json());

const calculateRewardPoints = (total) =>
  total >= 100 ? Math.floor(total / 100) * 10 : 0;

// Event Subscriber for PaymentReceived event
eventSubscriber.on('PaymentReceived', (data) => {
  logger.info(`BookStoreHub Monolith received PaymentReceived event`);
  const { orderId } = data;
  const order = orders.find((o) => o.orderId === orderId);
  if (order) {
    // Ensure the user's order history array exists
    if (!orderHistory[order.userId]) {
      orderHistory[order.userId] = [];
    }

    // Add the new order to the user's order history
    orderHistory[order.userId].push(order);
    logger.info(`BookStoreHub Monolith added order history`, order);
    const points = calculateRewardPoints(order.total);
    rewards[order.userId] = (rewards[order.userId] || 0) + points;
    logger.info(
      `BookStoreHub Monolith updated rewards to ${rewards[order.userId]}`
    );
  }
});

app.post('/order', (req, res) => {
  const { userId, items } = req.body;
  const total = items.reduce((acc, item) => acc + item.price, 0);
  const orderId = Date.now();

  const newOrder = { orderId, userId, items, total };
  orders.push(newOrder);

  // Publish an OrderCreated event
  eventPublisher.publish('OrderCreated', { userId, orderId, total });
  logger.info(`Order ${orderId} created for user ${userId}`);
  res.status(201).send({ message: 'Order created', order: newOrder });
});

// ... other routes ...
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
app.listen(PORT, () =>
  logger.info(`BookStoreHub Monolith running on port ${PORT}`)
);
