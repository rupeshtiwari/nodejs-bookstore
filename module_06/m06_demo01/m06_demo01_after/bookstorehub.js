const express = require('express');
const axios = require('axios');
const logger = require('../../../logger/logger'); // Import the logger module
const { orders, orderHistory, payments } = require('../utils/db');
const LoadBalancer = require('./loadbalancer'); // Import the loadbalancer module

const PORT = 3003;
const app = express();
app.use(express.json());

const addPayment = (userId, orderId, amount) => {
  payments[orderId] = { userId, amount };
};

const rewardsEndpoint = '/rewards'; // Define the rewards endpoint
const domainNames = {
  monolith: 'http://localhost:3001',
  microservice: 'http://localhost:3002',
};

// Traffic percentages for LoadBalancer
const trafficPercentages = {
  microservice: 0.5, // 20% traffic to the microservice
  monolith: 0.5, // 80% traffic to the monolith
};

// Create a LoadBalancer instance
const loadBalancer = new LoadBalancer(
  rewardsEndpoint,
  domainNames,
  trafficPercentages
);

const addRewards = async (req) => {
  const serviceUrl = loadBalancer.determineServiceUrl(false);
  // Use the logger for logging instead of console.log
  logger.info(`Routing POST rewards request to: ${serviceUrl}`);
  try {
    const response = await axios.post(serviceUrl, req.body);
    // Trace log to show rewards added
    logger.info('Rewards added:', response.data);
    return response.data;
  } catch (error) {
    // Use the logger for error logging
    logger.error('Error adding rewards:', error.message);
    throw new Error('Error processing rewards');
  }
};

app.post('/order', async (req, res) => {
  try {
    const { userId, items } = req.body;
    const orderId = Date.now();
    const newOrder = { orderId, userId, items };
    orders.push(newOrder);
    orderHistory[userId] = orderHistory[userId] || [];
    orderHistory[userId].push(newOrder);
    addPayment(
      userId,
      orderId,
      items.reduce((acc, item) => acc + item.price, 0)
    );
    const rewardsResponse = await addRewards(req);

    message = 'Order created, payment processed, and rewards calculated';
    // Trace log to show order created
    logger.info(message, newOrder, rewardsResponse);

    res.status(201).json({
      message,
      order: newOrder,
      rewards: rewardsResponse,
    });
  } catch (error) {
    // Use the logger for error logging
    logger.error('Error processing order:', error);
    res.status(500).send('An error occurred during order processing.');
  }
});

app.get('/rewards/:userId', async (req, res) => {
  try {
    const serviceUrl = loadBalancer.determineServiceUrl(true);
    // Use the logger for logging instead of console.log
    logger.info(`Routing GET rewards request to: ${serviceUrl}`);

    const response = await axios.get(
      `${serviceUrl}/rewards/${req.params.userId}`
    );
    // Trace log to show rewards retrieved
    logger.info('Rewards retrieved:', response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    // Use the logger for error logging
    logger.error('Error retrieving rewards:', error.message);
    res.status(500).send('An error occurred retrieving rewards.');
  }
});

app.get('/order-history/:userId', (req, res) => {
  const userOrders = orderHistory[req.params.userId];
  if (userOrders) {
    res.status(200).json(userOrders);
  } else {
    res.status(404).send('User order history not found.');
  }
});

app.get('/payment/:orderId', (req, res) => {
  const paymentInfo = payments[req.params.orderId];
  if (paymentInfo) {
    res.status(200).json(paymentInfo);
  } else {
    res.status(404).send('Payment information not found.');
  }
});

app.listen(PORT, () => {
  logger.info(`BookStoreHub running on port ${PORT}`);
});
