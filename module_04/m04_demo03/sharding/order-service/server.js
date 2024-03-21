const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bookstore');

const OrderSchema = new mongoose.Schema({
  productId: Number,
  quantity: Number,
  orderDate: Date,
});
const Order = mongoose.model('Order', OrderSchema);

app.post('/create-order', async (req, res) => {
  const { productId, quantity } = req.body;
  const order = new Order({
    productId,
    quantity,
    orderDate: new Date(),
  });

  try {
    await order.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
