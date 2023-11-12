const express = require('express');
const  eventSubscriber  = require('./eventSubscriber');
const  eventPublisher  = require('./eventPublisher');
const logger = require('../../../logger/logger');

const PORT = 3030;
const app = express();
app.use(express.json());

let payments = {};

eventSubscriber.on('OrderCreated', (data) => {
  const { userId, orderId, total } = data;
  payments[orderId] = { userId, amount: total };
  logger.info(`Payment processed for order ${orderId}`);

  // Publish a PaymentReceived event
  eventPublisher.publish('PaymentReceived', { orderId });
});

app.get('/payment/:orderId', (req, res) => {
  const paymentInfo = payments[req.params.orderId];
  if (paymentInfo) {
    res.status(200).json(paymentInfo);
  } else {
    res.status(404).send('Payment information not found.');
  }
});

app.listen(PORT, () => logger.info(`Payment Service running on port ${PORT}`));
