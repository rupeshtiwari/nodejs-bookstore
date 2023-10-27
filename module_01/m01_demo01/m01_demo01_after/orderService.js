const express = require('express');
const orderService = express();

orderService.use(express.json());

orderService.post('/createOrder', (req, res) => {
  // Logic to create an order
});

orderService.listen(3002, () => {
  console.log('Order Service started on port 3002');
});
