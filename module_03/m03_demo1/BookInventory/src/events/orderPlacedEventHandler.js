const inventoryService = require('../services/inventoryService');

// Handler for 'OrderPlaced' event
async function orderPlacedEventHandler(data) {
  try {
    console.log('Received OrderPlaced event:', data);

    // Logic to update stock based on the received order data
    const result = await inventoryService.updateStock(data);

    console.log('Stock updated successfully:', result);
  } catch (error) {
    console.error('Error handling OrderPlaced event:', error);
  }
}

module.exports = orderPlacedEventHandler;
