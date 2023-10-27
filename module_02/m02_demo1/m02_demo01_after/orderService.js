const express = require('express');
const orderService = express();
const eventStore = [];

orderService.use(express.json());

orderService.post('/order', (req, res) => {
  const orderCreatedEvent = {
    type: 'OrderCreated',
    data: {
      id: Date.now(),
      items: req.body.items,
      total: req.body.items.reduce((acc, item) => acc + item.price, 0),
    },
  };
  eventStore.push(orderCreatedEvent);
  res.status(201).send(orderCreatedEvent.data);
});

orderService.listen(3003, () => {
  console.log('Order Service started on port 3003');
});
