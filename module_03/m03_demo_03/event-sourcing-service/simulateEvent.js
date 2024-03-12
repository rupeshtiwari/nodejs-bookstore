const { Kafka } = require('kafkajs');

// Create a new instance of the Kafka client
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // Replace with your Kafka broker addresses
});

// Function to publish an event to a Kafka topic
const publishEvent = async (topic, event) => {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: JSON.stringify(event) }],
  });
  await producer.disconnect();
};

// Define the event you want to simulate
const bookEvent = {
  type: 'BOOK_ADDED',
  data: {
    bookId: '123',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
  },
};

// Kafka topic to publish the event to
const topic = 'book-events';

// Call the function to publish the event
publishEvent(topic, bookEvent)
  .then(() => console.log(`Event published to topic ${topic}`))
  .catch((error) => console.error('Error publishing event', error));
