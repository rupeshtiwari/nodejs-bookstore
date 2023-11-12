const express = require('express');
const bodyParser = require('body-parser');
const { rewards } = require('../utils/db');
const logger = require('../../../logger/logger');

const PORT = 3001;
const app = express();
app.use(bodyParser.json());

// Function to calculate reward points based on total amount
const calculateRewardPoints = (total) => {
  return total >= 100 ? Math.floor(total / 100) * 10 : 0;
};

// POST endpoint to calculate rewards based on order details
app.post('/rewards', (req, res) => {
  logger.info('Monolith Rewards Service: Received POST request:', req.body);
  const { userId, items } = req.body;

  // Validate request body format
  if (!Array.isArray(items)) {
    logger.error('Invalid request format for items');
    return res
      .status(400)
      .send("Invalid 'items' format. It should be an array.");
  }

  // Calculate total order amount
  const total = items.reduce((acc, item) => acc + item.price, 0);
  logger.info(`Total order amount for user ${userId}: $${total}`);

  // Calculate and update reward points
  const points = calculateRewardPoints(total);
  rewards[userId] = (rewards[userId] || 0) + points;
  logger.info(`Updated reward points for user ${userId}: ${points}`);

  // Respond with the calculated rewards
  res.status(201).json({ userId, points: rewards[userId] });
});

// GET endpoint to retrieve rewards for a specific user
app.get('/rewards/:userId', (req, res) => {
  const userId = req.params.userId;
  logger.info(
    `Monolith Rewards Service: Received GET request for user ${userId}`
  );

  // Retrieve reward points for the user
  const points = rewards[userId] || 0;
  logger.info(`Reward points for user ${userId}: ${points}`);

  // Respond with the reward points
  res.status(200).json({ userId, points });
});

app.listen(PORT, () => {
  logger.info(`Monolith Rewards service running on port ${PORT}`);
});
