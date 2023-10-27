const express = require('express');
const orderService = express();

orderService.use(express.json());

orderService.post('/order', (req, res) => {
  const order = {
    id: Date.now(),
    items: req.body.items,
    total: req.body.items.reduce((acc, item) => acc + item.price, 0),
  };
  res.status(201).send(order);
});

orderService.listen(3003, () => {
  console.log('Order Service started on port 3003');
});
