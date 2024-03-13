// src/consumers/readModelUpdater.js
const kafka = require('../config/kafkaConfig');

const topic = 'bookEvents';
const consumer = kafka.consumer({ groupId: 'bookstore-group' });

const updateReadModel = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        console.log(`Received event: ${event.type}`, event.data);
        // Process the event...
      } catch (error) {
        console.error(`Error processing message: ${error.message}`, error);
      }
    },
  });
};

module.exports = updateReadModel;
