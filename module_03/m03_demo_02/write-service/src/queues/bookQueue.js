// src/queues/bookQueue.js
const { connect } = require('../config/amqpConfig');
const BookModel = require('../models/bookModel');

async function startConsumer() {
  const channel = await connect();
  channel.consume(
    'bookUpdates',
    (msg) => {
      const { action, bookId, payload } = JSON.parse(msg.content.toString());

      switch (action) {
        case 'updateInventory':
          BookModel.updateInventory(bookId, payload.quantity);
          break;
        case 'addReview':
          BookModel.addReview(bookId, payload.review);
          break;
        default:
          console.log('Unknown action');
      }

      channel.ack(msg);
    },
    {
      noAck: false,
    }
  );
}

module.exports = { startConsumer };
