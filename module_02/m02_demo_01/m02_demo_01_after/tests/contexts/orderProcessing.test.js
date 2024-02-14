const { createOrder } = require('../../contexts/orderProcessing');
const {
  checkStock,
  updateStock,
  getBookDetails,
} = require('../../contexts/bookInventory');

// Properly mock the entire module to ensure isolation
jest.mock('../../contexts/bookInventory');

describe('Order Processing', () => {
  beforeEach(() => {
    // Reset mock implementations to their default state before each test
    checkStock.mockReset();
    updateStock.mockReset();
    getBookDetails.mockReset();

    // Setup default successful mock implementations
    checkStock.mockImplementation((bookId, quantity) => true);
    getBookDetails.mockImplementation((bookId) => ({
      bookId,
      title: 'Test Book',
      price: 25,
      genre: 'Test Genre',
      stock: 10,
    }));
  });

  it('creates an order successfully', () => {
    const customerId = 'C1001';
    const bookId = 'B1001';
    const quantity = 1;

    const result = createOrder(customerId, bookId, quantity);

    expect(result.success).toBe(true);
    expect(result.status).toBe('Confirmed');
    expect(result.totalPrice).toBe(25); // Checking for totalPrice inclusion
    // Verify that dependencies were called correctly
    expect(checkStock).toHaveBeenCalledWith(bookId, quantity);
    expect(updateStock).toHaveBeenCalledWith(bookId, quantity);
    expect(getBookDetails).toHaveBeenCalledWith(bookId);
  });

  it('fails to create an order when stock is insufficient', () => {
    // Override checkStock to simulate insufficient stock
    checkStock.mockImplementation((bookId, quantity) => false);

    const customerId = 'C1001';
    const bookId = 'B1001';
    const quantity = 11; // Exceeds available stock

    const result = createOrder(customerId, bookId, quantity);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Book unavailable or insufficient stock');
    // checkStock should be called, but not updateStock or getBookDetails
    expect(checkStock).toHaveBeenCalledWith(bookId, quantity);
    expect(updateStock).not.toHaveBeenCalled();
    expect(getBookDetails).not.toHaveBeenCalled();
  });
  it('fails to create an order when book details are not found', () => {
    // Simulate getBookDetails returning null for a missing book
    getBookDetails.mockImplementation(() => null);

    const customerId = 'C1001';
    const bookId = 'B1003'; // Assuming B1003 does not exist
    const quantity = 1;

    const result = createOrder(customerId, bookId, quantity);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Book details not found');
    expect(getBookDetails).toHaveBeenCalledWith(bookId);
    // Updated expectation: checkStock is called because createOrder checks stock before checking book details
    expect(checkStock).toHaveBeenCalledWith(bookId, quantity);
    // Since the order fails before updateStock due to missing book details, updateStock should not be called.
    expect(updateStock).not.toHaveBeenCalled();
  });
});
