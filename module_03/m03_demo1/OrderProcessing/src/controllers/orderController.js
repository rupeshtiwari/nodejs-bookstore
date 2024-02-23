const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');

router.post('/orders', async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;
