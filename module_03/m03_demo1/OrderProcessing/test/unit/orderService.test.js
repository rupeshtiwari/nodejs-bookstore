const orderService = require('../../src/services/orderService');
const Order = require('../../src/models/orderModel'); // Import the Order model
const eventEmitter = require('../../src/utilities/eventEmitter');

// Mock the bookService to return a fixed price
jest.mock('../../src/services/bookService', () => ({
  getBookDetails: jest.fn().mockResolvedValue({ price: 20 }),
}));

// Correctly mock the entire Order model to simulate a constructor and save method
jest.mock('../../src/models/orderModel', () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue({
        customerId: '123',
        items: [{ bookId: 'book1', quantity: 1 }],
        totalAmount: 20, // Ensure this matches the expected calculation
      }),
    };
  });
});

// Mock the eventEmitter to not actually emit events
jest.mock('../../src/utilities/eventEmitter', () => ({
  emit: jest.fn(),
}));

describe('OrderService - createOrder', () => {
  it('successfully creates an order', async () => {
    // Mocked order data
    const orderData = {
      customerId: '123',
      items: [{ bookId: 'book1', quantity: 1 }],
    };

    // Call the createOrder function
    const result = await orderService.createOrder(orderData);

    // Check if the Order model was used to construct an order
    expect(Order).toHaveBeenCalled();

    // Ensure that the totalAmount is correctly calculated and matches the mock
    expect(result.totalAmount).toBe(20);

    // Ensure that the eventEmitter.emit function was called with 'OrderPlaced'
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      'OrderPlaced',
      expect.anything()
    );
  });
});
