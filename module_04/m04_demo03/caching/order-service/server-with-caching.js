const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createClient } = require('redis');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore');

// Create Redis Client and Connect
const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
(async () => {
  await redisClient.connect();
})();

const Order = mongoose.model(
  'Order',
  new mongoose.Schema({
    orderId: Number,
    status: String,
  })
);

app.post('/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).send(order);
});

app.get('/orders/:orderId', async (req, res) => {
  const cacheKey = `order:${req.params.orderId}`;

  try {
    // Try fetching the result from Redis first
    const cachedOrder = await redisClient.get(cacheKey);
    if (cachedOrder) {
      return res.json({ source: 'cache', data: JSON.parse(cachedOrder) });
    }

    // If not in cache, fetch from MongoDB
    const orderData = await Order.findOne({ orderId: req.params.orderId });

    // Save the MongoDB result in Redis cache (adjust TTL as needed)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(orderData)); // cache for 1 hour

    res.json({ source: 'db', data: orderData });
  } catch (error) {
    console.error('Error accessing Redis or MongoDB', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
