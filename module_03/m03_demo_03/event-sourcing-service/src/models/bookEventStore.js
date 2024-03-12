// src/models/bookEventStore.js
const publishEvent = require('../events/bookEventPublisher');

class BookEventStore {
  static async storeEvent(eventType, eventData) {
    const event = { eventType, eventData, timestamp: new Date() };
    console.log('Storing event:', event);
    await publishEvent(event);
  }
}

module.exports = BookEventStore;
