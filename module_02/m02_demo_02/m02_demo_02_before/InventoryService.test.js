const {
  addBook,
  updateBookPrice,
} = require('./inventoryService');

describe('Legacy Inventory Service - Entity (Book) Related Tests', () => {
  let books = [];
  let categories = [];

  beforeEach(() => {
    books = [];
    categories = [];
  });

  test('Business rule enforcement for book addition is duplicated', () => {
    // Demonstrating duplicate validation logic by adding a book in one place...
    addBook(
      books,
      categories,
      '001',
      'First Book',
      'Author One',
      10,
      5,
      'Fiction'
    );
    // ...and having similar validation logic in another method like updateBookPrice or updateBookStock
    updateBookPrice(books, '001', 20); // This also checks for positive price internally

    const book = books.find((b) => b.isbn === '001');
    expect(book.price).toEqual(20);
    // This test passes, but it shows that we have to maintain validation logic in multiple places.
  });

  test('Direct manipulation of book properties allows inconsistent states', () => {
    addBook(
      books,
      categories,
      '002',
      'Second Book',
      'Author Two',
      15,
      10,
      'Non-Fiction'
    );
    const book = books.find((b) => b.isbn === '002');
    book.stock = -10; // Direct manipulation bypassing business rules
    expect(book.stock).toBeLessThan(0); // This should not be possible with proper encapsulation
  });
});

describe('Legacy Inventory Service - Aggregate (Category) Related Tests', () => {
  let books = [];
  let categories = [];

  beforeEach(() => {
    books = [];
    categories = [];
  });

  test('Direct manipulation of aggregate internals (category books list)', () => {
    addBook(
      books,
      categories,
      '003',
      'Third Book',
      'Author Three',
      20,
      5,
      'Fiction'
    );
    const category = categories.find((c) => c.genre === 'Fiction');
    category.books.push({
      isbn: '004',
      title: 'Improperly Added Book',
      author: 'Author Four',
      price: 5,
      stock: 5,
      genre: 'Fiction',
    }); // Directly manipulating the internals of an aggregate
    expect(category.books.length).toBeGreaterThan(1);
  });

  test('Lack of encapsulation in aggregate operations', () => {
    addBook(
      books,
      categories,
      '005',
      'Fifth Book',
      'Author Five',
      25,
      5,
      'Non-Fiction'
    );
    const category = categories.find((c) => c.genre === 'Non-Fiction');
    // Demonstrates tight coupling by directly affecting aggregate internals without business rule enforcement
    category.books[0].price = -20; // Should be prevented by encapsulation
    expect(category.books[0].price).toBeLessThan(0);
  });
});
