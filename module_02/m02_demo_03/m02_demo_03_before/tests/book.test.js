// Tests reveal the need for value objects by showing external, repeated validation logic.
const Book = require('../book');

describe('Book entity validation', () => {
  // Direct validation bypasses the opportunity for encapsulation and integrity ensured by value objects.
  test('ISBN format validation upon creation', () => {
    const validISBN = '978-3-16-148410-0';
    const invalidISBN = '123-4-56-78910-1';
    // Violates DDD by not using a value object for ISBN, risking inconsistent validation.
    expect(() => new Book(validISBN, 100, 10)).not.toThrow();
    expect(() => new Book(invalidISBN, 100, 10)).toThrow(
      'Invalid ISBN format.'
    );
  });

  // Price validation here also highlights the lack of a value object to encapsulate and enforce business rules.
  test('Price validation upon creation', () => {
    const isbn = '978-3-16-148410-0';
    // Exposes the risk of scattered and inconsistent price validation across the domain.
    expect(() => new Book(isbn, 100, 10)).not.toThrow();
    expect(() => new Book(isbn, -100, 10)).toThrow('Price must be positive.');
  });
});
