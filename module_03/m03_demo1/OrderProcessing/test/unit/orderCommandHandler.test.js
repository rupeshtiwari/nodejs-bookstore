const OrderCommandHandler = require('../../src/handlers/orderCommandHandler');
const OrderService = require('../../src/services/orderService');
const eventEmitter = require('../../src/utilities/eventEmitter');

// Mock OrderService
jest.mock('../../src/services/orderService', () => ({
  createOrder: jest.fn(),
}));

// Mock eventEmitter
jest.mock('../../src/utilities/eventEmitter', () => ({
  emit: jest.fn(),
}));

describe('OrderCommandHandler', () => {
  let orderCommandHandler;

  beforeEach(() => {
    // Reset mocks and create a new instance of OrderCommandHandler before each test
    jest.clearAllMocks();
    orderCommandHandler = new OrderCommandHandler();
  });

  it('should handle a valid command and emit OrderPlaced event', async () => {
    // Mock command data
    const command = {
      customerId: 'customer123',
      items: [{ bookId: 'book1', quantity: 2 }],
    };

    // Mock the return value of OrderService.createOrder
    const mockOrder = {
      id: 'order123',
      customerId: 'customer123',
      items: command.items,
    };
    OrderService.createOrder.mockResolvedValueOnce(mockOrder);

    // Call the handle method
    const result = await orderCommandHandler.handle(command);

    // Verify that OrderService.createOrder was called with the correct arguments
    expect(OrderService.createOrder).toHaveBeenCalledWith({
      customerId: 'customer123',
      items: [{ bookId: 'book1', quantity: 2 }],
    });

    // Verify that eventEmitter.emit was called with the correct event name and order data
    expect(eventEmitter.emit).toHaveBeenCalledWith('OrderPlaced', mockOrder);

    // Verify that the result matches the expected order
    expect(result).toEqual(mockOrder);
  });

  it('should throw an error if OrderService.createOrder throws an error', async () => {
    // Mock command data
    const command = {
      customerId: 'customer123',
      items: [{ bookId: 'book1', quantity: 2 }],
    };

    // Mock OrderService.createOrder to throw an error
    OrderService.createOrder.mockRejectedValueOnce(
      new Error('Failed to create order')
    );

    // Call the handle method and expect it to throw an error
    await expect(orderCommandHandler.handle(command)).rejects.toThrow(
      'Order processing failed: Failed to create order'
    );

    // Verify that OrderService.createOrder was called with the correct arguments
    expect(OrderService.createOrder).toHaveBeenCalledWith({
      customerId: 'customer123',
      items: [{ bookId: 'book1', quantity: 2 }],
    });

    // Verify that eventEmitter.emit was not called
    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });
});
