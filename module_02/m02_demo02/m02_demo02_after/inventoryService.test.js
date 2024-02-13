const Book = require('./Book');
const BookRepository = require('./bookRepository');
const InventoryService = require('./investoryService');

describe('InventoryService Concurrency Handling', () => {
  let inventoryService;

  beforeEach(() => {
    const bookRepository = new BookRepository();
    inventoryService = new InventoryService(bookRepository);
    // Assuming the BookRepository.addBook method exists and correctly adds the book
    bookRepository.addBook(new Book('9780451526537', 'Space Odyssey', 10, 20));
  });

  it('prevents overselling when multiple sales occur simultaneously', async () => {
    const salesCount = 15; // Attempt to sell more books than available
    const salesPromises = Array.from({ length: salesCount }, () =>
      inventoryService
        .sellBook('9780451526537', 1)
        .catch((e) => ({ success: false, message: e.message }))
    );

    const results = await Promise.all(salesPromises);
    const successfulSales = results.filter((result) => result.success).length;

    // Assert that successful sales do not exceed the stock
    expect(successfulSales).toBeLessThanOrEqual(10);

    // Fetch the book again to check the final stock
    const book = await inventoryService.bookRepository.findBookByIsbn(
      '9780451526537'
    );
    expect(book.stock).toBeGreaterThanOrEqual(0); // Ensure stock doesn't go negative
  });
});
