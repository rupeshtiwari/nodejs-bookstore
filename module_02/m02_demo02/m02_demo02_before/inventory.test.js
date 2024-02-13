const { processSale, booksInventory } = require('./inventory');

describe('BookStoreHub Inventory Management', () => {
  beforeEach(() => {
    // Initialize or reset the book's stock before each test
    booksInventory['9780451526537'].stock = 10;
  });
  it('correctly processes a single sale', async () => {
    // Process a single sale of 1 book
    const result = await processSale('9780451526537', 1);

    // Assert the sale was successful
    expect(result.success).toBeTruthy();
    // Assert the final price is correctly calculated with the promotion
    expect(result.price).toBe(18); // Assuming a 10% discount on a $20 base price
    // Assert the stock level is correctly decremented
    expect(booksInventory['9780451526537'].stock).toBe(9);
  });
  it('should prevent overselling in high concurrency', async () => {
    const salesPromises = [];
    for (let i = 0; i < 15; i++) {
      // Attempt to sell more books than in stock concurrently
      salesPromises.push(processSale('9780451526537', 1));
    }

    const results = await Promise.all(salesPromises);
    const successfulSales = results.filter((result) => result.success).length;

    // Assert that successful sales do not exceed initial stock
    expect(successfulSales).toBeLessThanOrEqual(10);
    // Additionally, check that stock is not negative
    expect(booksInventory['9780451526537'].stock).toBeGreaterThanOrEqual(0);
  });
});
