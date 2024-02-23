const express = require('express');
const router = express.Router();
const CreateOrderCommand = require('../commands/createOrderCommand');
const OrderCommandHandler = require('../handlers/orderCommandHandler');

const orderCommandHandler = new OrderCommandHandler();

router.post('/orders', async (req, res) => {
  try {
    const command = new CreateOrderCommand(req.body.customerId, req.body.items);
    const order = await orderCommandHandler.handle(command);
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
