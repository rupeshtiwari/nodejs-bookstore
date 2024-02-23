const eventstore = require('node-eventstore-client');
const connectionString = 'ConnectTo=tcp://admin:changeit@localhost:1113'; // Example connection string
const connection = eventstore.createConnection({}, connectionString);
const eventStoreStream = 'MainStream'; // Common stream for all events

class BUS {
  constructor() {
    if (!BUS.instance) {
      this._connection = connection;
      this._connection.connect();
      this._connection.once('connected', () =>
        console.log('Connected to Event Store')
      );
      BUS.instance = this;
    }
    return BUS.instance;
  }

  async sendCommand(command) {
    // Placeholder for command handling logic
  }

  async publishEvent(eventType, eventData) {
    const eventId = eventstore.uuid();
    const event = eventstore.createJsonEventData(
      eventId,
      eventData,
      null,
      eventType
    );
    await this._connection.appendToStream(
      eventStoreStream,
      eventstore.expectedVersion.any,
      event
    );
    console.log(`Event published: ${eventType}`);
  }

  subscribeMessage(eventType, handler) {
    const subscription = this._connection.subscribeToStreamFrom(
      eventStoreStream,
      null,
      true,
      (sub, event) => {
        if (event.originalEvent.eventType === eventType) {
          handler(event.originalEvent.data);
        }
      },
      () => console.log('Subscription dropped.')
    );
    console.log(`Subscribed to event: ${eventType}`);
    return subscription;
  }
}

const instance = new BUS();
Object.freeze(instance);

module.exports = instance;
