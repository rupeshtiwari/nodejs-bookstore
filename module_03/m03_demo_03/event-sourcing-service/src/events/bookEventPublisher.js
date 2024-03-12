// src/events/bookEventPublisher.js
const kafka = require('../config/kafkaConfig');

const topic = 'bookEvents';
const producer = kafka.producer();

const publishEvent = async (event) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(event) }],
  });
  await producer.disconnect();
};

module.exports = publishEvent;
