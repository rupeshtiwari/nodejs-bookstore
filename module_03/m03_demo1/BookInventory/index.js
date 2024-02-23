const eventBus = require('../../shared/utilities/bus');
const orderPlacedEventHandler = require('./eventHandlers/orderPlacedEventHandler');

// Establish connection to the event store/message bus
eventBus.connect();

// Subscribe to 'OrderPlaced' event from OrderProcessing service
eventBus.subscribeMessage('OrderPlaced', orderPlacedEventHandler);

// Start the service if needed (e.g., listen on a port if this service has an HTTP interface)
// ...

console.log('Inventory Service started and listening for events...');
