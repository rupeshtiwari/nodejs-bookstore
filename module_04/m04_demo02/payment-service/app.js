// app.js
const express = require('express');
const { registerService } = require('./consul');
const { PORT } = require('./config');

const app = express();

// Register the service with Consul
registerService();

app.get('/health', (req, res) => {
  res.send({ status: 'Payment service is healthy' });
});

app.post('/process', (req, res) => {
  console.log('Received request to process payment');
  console.log('Processing payment...');
  res.json({ status: 'Payment processed successfully' });
});

app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});
