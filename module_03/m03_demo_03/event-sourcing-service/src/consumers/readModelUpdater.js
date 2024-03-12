// src/consumers/readModelUpdater.js
const kafka = require('../config/kafkaConfig');

const topic = 'bookEvents';
const consumer = kafka.consumer({ groupId: 'bookstore-group' });

const updateReadModel = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log(`Received event: ${event.eventType}`, event.eventData);
      // Update read model based on the event type and data
    },
  });
};

module.exports = updateReadModel;
