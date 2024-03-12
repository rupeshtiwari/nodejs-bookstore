// src/config/kafkaConfig.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'bookstore',
  brokers: ['localhost:9092'], // Adjust if your Kafka brokers have different addresses
});

module.exports = kafka;
