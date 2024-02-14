const InventoryService = require('../services/inventoryService');
const BookRepository = require('../repositories/bookRepository');
const CategoryRepository = require('../repositories/categoryRepository');

describe('Refactored DDD Inventory Service - Entity (Book) Related Tests', () => {
  let inventoryService, bookRepository, categoryRepository;

  beforeEach(() => {
    bookRepository = new BookRepository();
    categoryRepository = new CategoryRepository();
    inventoryService = new InventoryService(bookRepository, categoryRepository);
  });

  test('Business rule enforcement for book addition is centralized', () => {
    inventoryService.addBook({
      isbn: '001',
      title: 'First Book',
      author: 'Author One',
      price: 10,
      stock: 5,
      genre: 'Fiction',
    });
    // Attempting to update book price with business rule enforcement
    expect(() => inventoryService.updateBookPrice('001', -20)).toThrow(
      'Price must be positive.'
    );

    const book = bookRepository.findByIsbn('001');
    expect(book.price).toEqual(10); // Price remains unchanged due to business rule
  });

  test('Encapsulation prevents direct manipulation of book properties', () => {
    inventoryService.addBook({
      isbn: '002',
      title: 'Second Book',
      author: 'Author Two',
      price: 15,
      stock: 10,
      genre: 'Non-Fiction',
    });
    const book = bookRepository.findByIsbn('002');
    expect(() => book.setStock(-10)).toThrow('Stock must be positive.');
  });
});

describe('Refactored DDD Inventory Service - Aggregate (Category) Related Tests', () => {
  let inventoryService, bookRepository, categoryRepository;

  beforeEach(() => {
    bookRepository = new BookRepository();
    categoryRepository = new CategoryRepository();
    inventoryService = new InventoryService(bookRepository, categoryRepository);
  });

  test('Books are correctly managed by Category aggregate', () => {
    inventoryService.addBook({
      isbn: '003',
      title: 'Third Book',
      author: 'Author Three',
      price: 20,
      stock: 5,
      genre: 'Fiction',
    });

    const category = categoryRepository.findByGenre('Fiction');
    expect(category).toBeDefined();
    const book = category.findBook('003');
    expect(book).toBeDefined();
    expect(book.title).toEqual('Third Book');

    // Trying to add a book directly to the category's book list should not be possible
    // or should be controlled by the category's methods to enforce business rules
  });

  test('Encapsulation in Category prevents unauthorized manipulation', () => {
    inventoryService.addBook({
      isbn: '005',
      title: 'Fifth Book',
      author: 'Author Five',
      price: 25,
      stock: 5,
      genre: 'Non-Fiction',
    });

    const category = categoryRepository.findByGenre('Non-Fiction');
    expect(() => {
      // Attempting to add a book directly to the category's book array should not be allowed or should throw an error
      category.books.push(new Book('006', 'Invalid Book', 'Author Six', 10, 1));
    }).toThrow(); // Assuming you have logic to prevent direct manipulation or this action is controlled
    // This test ensures encapsulation within the Category aggregate
  });
});
