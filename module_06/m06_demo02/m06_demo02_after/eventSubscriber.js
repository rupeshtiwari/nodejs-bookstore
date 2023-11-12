const amqp = require('amqplib');
const EventEmitter = require('events');

class EventSubscriber extends EventEmitter {}

const eventSubscriber = new EventSubscriber();

async function connectRabbitMQ() {
  const connection = await amqp.connect('amqp://127.0.0.1');
  const channel = await connection.createChannel();
  await channel.assertExchange('events', 'fanout', { durable: false });
  const q = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(q.queue, 'events', '');

  channel.consume(
    q.queue,
    (msg) => {
      if (msg.content) {
        const content = JSON.parse(msg.content.toString());
        eventSubscriber.emit(content.event, content.data);
      }
    },
    { noAck: true }
  );
}

connectRabbitMQ();

module.exports = eventSubscriber;
