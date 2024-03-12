// src/index.js
require('dotenv').config();
const express = require('express');
const { startConsumer } = require('./queues/bookQueue');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Start RabbitMQ Consumer
startConsumer();

app.listen(PORT, () => {
  console.log(`Write Service running on port ${PORT}`);
});
