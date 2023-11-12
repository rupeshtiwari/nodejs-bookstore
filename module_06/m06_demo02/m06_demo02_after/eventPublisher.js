const amqp = require('amqplib');

let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect('amqp://127.0.0.1');
  channel = await connection.createChannel();
  await channel.assertExchange('events', 'fanout', { durable: false });
}

async function publish(eventName, data) {
  if (!channel) {
    await connectRabbitMQ();
  }
  const msg = JSON.stringify({ event: eventName, data: data });
  channel.publish('events', '', Buffer.from(msg));
}

module.exports = { publish };
