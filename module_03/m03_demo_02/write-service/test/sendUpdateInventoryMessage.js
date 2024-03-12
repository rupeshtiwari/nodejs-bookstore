// Simulate sending a message to the queue
const { connect } = require('../src/config/amqpConfig');

async function sendUpdateInventoryMessage() {
  const channel = await connect();
  const message = JSON.stringify({
    action: 'updateInventory',
    bookId: '1',
    payload: {
      quantity: 10,
    },
  });
  channel.sendToQueue('bookUpdates', Buffer.from(message));
}

sendUpdateInventoryMessage();
