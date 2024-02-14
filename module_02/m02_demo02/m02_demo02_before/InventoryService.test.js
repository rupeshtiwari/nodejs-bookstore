const { addBook, updateBookPrice } = require('./inventoryService.js');

describe('Legacy Inventory Service', () => {
  let books = [];
  let categories = [];
  let originalConsoleError;
  beforeEach(() => {
    // Resetting state before each test
    books = [];
    categories = [];
    originalConsoleError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    // Clean up if necessary
    console.error = originalConsoleError;
  });

  // Entity (Book) Related Issues
  test('Adding a book with negative stock does not enforce business rules', () => {
    addBook(
      books,
      categories,
      '001',
      'Test Book',
      'Author One',
      25,
      -10,
      'Test Genre'
    );
    const book = books.find((b) => b.isbn === '001');
    // Expect to fail because the business rule (positive stock) is not enforced
    expect(book).toBeDefined(); // The book is added despite the negative stock
    expect(book.stock).toBeGreaterThanOrEqual(0); // This will fail, highlighting the issue
  });

  test('Updating book price to a negative value is allowed', () => {
    addBook(
      books,
      categories,
      '002',
      'Another Test Book',
      'Author Two',
      30,
      5,
      'Another Test Genre'
    );
    updateBookPrice(books, '002', -20);
    const book = books.find((b) => b.isbn === '002');
    // Expect to fail because the business rule (positive price) is not enforced
    expect(book.price).toBeGreaterThanOrEqual(0); // This will fail
  });

  // Aggregate (Category) Related Issues
  test('Books added to a non-existent category are lost', () => {
    addBook(
      books,
      categories,
      '003',
      'Lost Book',
      'Author Three',
      15,
      5,
      'Lost Genre'
    );
    const category = categories.find((c) => c.genre === 'Lost Genre');
    // Expect the category to be automatically created, but this design might lead to unintended behavior
    expect(category).toBeDefined();
    expect(category.books.length).toBe(1); // This passes but highlights a design concern
  });

  test('Direct manipulation of category books allows inconsistent states', () => {
    addBook(
      books,
      categories,
      '004',
      'Direct Manipulation Book',
      'Author Four',
      20,
      10,
      'Direct Genre'
    );
    const category = categories.find((c) => c.genre === 'Direct Genre');
    category.books.push({
      isbn: '005',
      title: 'Invalid Book',
      author: 'No Author',
      price: -100,
      stock: -5,
      genre: 'Direct Genre',
    });
    // This test demonstrates that direct manipulation can lead to invalid states
    const invalidBook = category.books.find((b) => b.isbn === '005');
    expect(invalidBook).toBeDefined(); // The invalid book is added without validation
    expect(invalidBook.price).toBeGreaterThanOrEqual(0); // This will fail
    expect(invalidBook.stock).toBeGreaterThanOrEqual(0); // This will also fail
  });
});
