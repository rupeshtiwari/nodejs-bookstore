const { Book } = require('./book');
const { BookRepository } = require('./bookRepository');
const { InventoryService } = require('./inventoryService');

describe('Inventory Management Concurrency Handling', () => {
  it('prevents overselling when multiple sales occur simultaneously', async () => {
    const bookRepository = new BookRepository();
    const inventoryService = new InventoryService(bookRepository);
    const isbn = '9780451526537';
    const book = new Book(isbn, 'Space Odyssey', 10, 20);

    bookRepository.addBook(book);

    const salesCount = 11; // Attempt to sell one more than available stock
    const salesPromises = Array.from({ length: salesCount }, () => async () => {
      try {
        return await inventoryService.sellBook(isbn, 1);
      } catch (error) {
        return error.message;
      }
    }).map((func) => func());

    const results = await Promise.allSettled(salesPromises);
    const successfulSales = results.filter(
      (result) => result.value !== 'Insufficient stock'
    ).length;

    expect(successfulSales).toBeLessThanOrEqual(10); // Ensure no more than 10 successful sales
    expect(book.stock).toBeGreaterThanOrEqual(0); // Ensure stock is not negative
  });
});
