 

class CreateOrderCommand {
  constructor(customerId, items) {
    if (!customerId) {
      throw new Error('CustomerId is required');
    }
    if (!items || !items.length) {
      throw new Error('At least one item is required');
    }
    items.forEach((item) => {
      if (!item.bookId || item.quantity <= 0) {
        throw new Error(
          'Each item requires a bookId and a quantity greater than 0'
        );
      }
    });

    this.customerId = customerId;
    this.items = items;
  }
}

module.exports = CreateOrderCommand;
