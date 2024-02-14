const InventoryService = require('./inventoryService');

describe('Refactored Inventory Service', () => {
  let inventoryService;

  beforeEach(() => {
    inventoryService = new InventoryService();
  });

  // Entity (Book) Related Issues
  test('Adding a book with negative stock enforces business rules', () => {
    expect(() => {
      inventoryService.addBook(
        '001',
        'Test Book',
        'Author One',
        25,
        -10,
        'Test Genre'
      );
    }).toThrow('Stock must be positive');
  });

  test('Updating book price to a negative value enforces business rules', () => {
    inventoryService.addBook(
      '002',
      'Another Test Book',
      'Author Two',
      30,
      5,
      'Another Test Genre'
    );
    expect(() => {
      inventoryService.updateBookPrice('002', -20);
    }).toThrow('Price must be positive');
  });

  // Aggregate (Category) Related Issues
  test('Adding a book to a non-existent category creates the category and maintains correct state', () => {
    inventoryService.addBook(
      '003',
      'Lost Book',
      'Author Three',
      15,
      5,
      'New Genre'
    );
    const category = inventoryService.findCategory('New Genre');
    expect(category).toBeDefined();
    expect(category.books.some((book) => book.isbn === '003')).toBeTruthy();
  });

  test('Cannot directly manipulate category books to introduce inconsistent states', () => {
    inventoryService.addBook(
      '004',
      'Direct Manipulation Book',
      'Author Four',
      20,
      10,
      'Direct Genre'
    );
    const category = inventoryService.findCategory('Direct Genre');

    // Attempt to directly manipulate the category's books array should not be possible
    // This demonstrates the protection against invalid states through encapsulation
    expect(() => {
      category.books.push({
        isbn: '005',
        title: 'Invalid Book',
        author: 'No Author',
        price: -100,
        stock: -5,
        genre: 'Direct Genre',
      });
    }).toThrow();

    const invalidBook = category.books.find((book) => book.isbn === '005');
    expect(invalidBook).toBeUndefined(); // No invalid book should be added
  });
});
