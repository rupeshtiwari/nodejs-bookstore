const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore');

// Define Order Model
const Order = mongoose.model(
  'Order',
  new mongoose.Schema({
    orderId: { type: Number, index: true },
    status: String,
    // other relevant fields...
  })
);

// Endpoint to create a new order
app.post('/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).send(order);
});

// Endpoint to check order status
app.get('/orders/:orderId', async (req, res) => {
  const startTime = process.hrtime();
  const order = await Order.findOne({ orderId: req.params.orderId });
  const endTime = process.hrtime(startTime);
  
  // Calculate response time in milliseconds
  const responseTime = (endTime[0] * 1000 + endTime[1] / 1e6).toFixed(3);
  
  if (order) {
    res.send({ order, responseTime: `${responseTime} ms` });
  } else {
    res.status(404).send({ message: 'Order not found', responseTime: `${responseTime} ms` });
  }
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
