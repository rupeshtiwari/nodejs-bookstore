// sendAddReviewMessage.js
const { connect } = require('../src/config/amqpConfig');

async function sendMessage() {
  const channel = await connect();
  const message = JSON.stringify({
    action: 'addReview',
    bookId: '1', // Use the relevant book ID
    payload: {
      review: 'This book is fantastic! Highly recommend reading it.', // Example review
    },
  });
  channel.sendToQueue('bookUpdates', Buffer.from(message));
  console.log("Sent 'addReview' message:", message);

  // Close the channel and connection properly after sending the message
  setTimeout(() => {
    channel.close();
    // Depending on your AMQP connection setup, you might also need to close the connection if it's not automatically managed
    // conn.close(); // Uncomment if you have a `conn` reference and need to close it explicitly
  }, 500); // Adjust the delay as needed to ensure the message is sent before closing
}

sendMessage();
