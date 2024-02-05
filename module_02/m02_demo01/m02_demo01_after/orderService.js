const express = require('express');
const orderService = express();
const repo = require('./orderRepo');

orderService.use(express.json());

orderService.post('/order', (req, res) => {
  const order = {
    id: Date.now(),
    items: req.body.items,
    total: req.body.items.reduce((acc, item) => acc + item.price, 0),
  };
  repo.saveOrder(order);
  res.status(201).send(order);
});

orderService.listen(3002, () => {
  console.log('Order Service started on port 3002');
});
