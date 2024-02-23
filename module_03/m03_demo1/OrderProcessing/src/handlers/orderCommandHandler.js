

const OrderService = require('../services/orderService');
const BUS = require('../../shared/utilities/bus');

class OrderCommandHandler {
  async handle(command) {
    // Validation is already performed in the command's constructor
    try {
      // Extract data from the command
      const { customerId, items } = command;
      // Delegate the business logic to the order service
      const order = await OrderService.createOrder({ customerId, items });

      // Emit an event indicating that an order has been successfully placed
      BUS.publishEvent('OrderPlaced', orderData);
        
      return order;
    } catch (error) {
      // Error handling logic, could re-throw or handle specific errors differently
      throw new Error(`Order processing failed: ${error.message}`);
    }
  }
}

module.exports = OrderCommandHandler;
