const Book = require('../../models/book');

// Testing the Book entity with value objects ensures domain integrity.
describe('Book entity with Value Objects', () => {
  // Validates that the Book entity correctly utilizes the ISBN value object.
  test('Book creation with valid ISBN and Price', () => {
    const book = new Book('978-3-16-148410-0', 100, 10);
    expect(book.isbn.value).toEqual('978-3-16-148410-0');
    expect(book.price.amount).toEqual(100);
  });

  // Checks that Price's behavior, such as discount application, is encapsulated within the value object.
  test('Applying discount to Price through Book', () => {
    const book = new Book('978-3-16-148410-0', 100, 10);
    const discountedPrice = book.price.applyDiscount(10);
    expect(discountedPrice.amount).toBeLessThan(book.price.amount);
  });
});
