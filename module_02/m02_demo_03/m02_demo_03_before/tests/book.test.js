const Book = require('./book');
const { isValidISBN } = require('./helper');

describe('Book entity validation', () => {
  test('ISBN format validation upon creation', () => {
    const validISBN = '978-3-16-148410-0';
    const invalidISBN = '123-4-56-78910-1';

    expect(() => new Book(validISBN, 100, 10)).not.toThrow();
    expect(() => new Book(invalidISBN, 100, 10)).toThrow(
      'Invalid ISBN format.'
    );
  });

  test('Price validation upon creation', () => {
    const isbn = '978-3-16-148410-0';

    expect(() => new Book(isbn, 100, 10)).not.toThrow();
    expect(() => new Book(isbn, -100, 10)).toThrow('Price must be positive.');
  });
});
