// test/unit/createOrderCommand.test.js
const CreateOrderCommand = require('../../src/commands/createOrderCommand');

describe('CreateOrderCommand', () => {
  it('should create a valid command with customerId and items', () => {
    // Arrange
    const customerId = '123';
    const items = [{ bookId: 'book1', quantity: 2 }];

    // Act
    const command = new CreateOrderCommand(customerId, items);

    // Assert
    expect(command.customerId).toBe(customerId);
    expect(command.items).toEqual(items);
  });

  it('should throw an error if customerId is missing', () => {
    // Arrange
    const customerId = null;
    const items = [{ bookId: 'book1', quantity: 2 }];

    // Act & Assert
    expect(() => new CreateOrderCommand(customerId, items)).toThrow(
      'CustomerId is required'
    );
  });

  it('should throw an error if items are missing', () => {
    // Arrange
    const customerId = '123';
    const items = null;

    // Act & Assert
    expect(() => new CreateOrderCommand(customerId, items)).toThrow(
      'At least one item is required'
    );
  });

  it('should throw an error if items array is empty', () => {
    // Arrange
    const customerId = '123';
    const items = [];

    // Act & Assert
    expect(() => new CreateOrderCommand(customerId, items)).toThrow(
      'At least one item is required'
    );
  });

  it('should throw an error if any item has missing bookId', () => {
    // Arrange
    const customerId = '123';
    const items = [{ bookId: null, quantity: 2 }];

    // Act & Assert
    expect(() => new CreateOrderCommand(customerId, items)).toThrow(
      'Each item requires a bookId and a quantity greater than 0'
    );
  });

  it('should throw an error if any item has non-positive quantity', () => {
    // Arrange
    const customerId = '123';
    const items = [{ bookId: 'book1', quantity: 0 }];

    // Act & Assert
    expect(() => new CreateOrderCommand(customerId, items)).toThrow(
      'Each item requires a bookId and a quantity greater than 0'
    );
  });
});
