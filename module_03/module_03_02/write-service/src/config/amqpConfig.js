// src/config/amqpConfig.js
const amqp = require('amqplib');

const amqpUrl = process.env.AMQP_URL || 'amqp://localhost';

async function connect() {
  try {
    const conn = await amqp.connect(amqpUrl);
    const channel = await conn.createChannel();
    await channel.assertQueue('bookUpdates', {
      durable: false,
    });
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    process.exit(1);
  }
}

module.exports = { connect };
