const Book = require('../models/book');


describe('Book entity with Value Objects', () => {
  test('Book creation with valid ISBN and Price', () => {
    const book = new Book('978-3-16-148410-0', 100, 10);
    expect(book.isbn.value).toEqual('978-3-16-148410-0');
    expect(book.price.amount).toEqual(100);
  });

  test('Applying discount to Price through Book', () => {
    const book = new Book('978-3-16-148410-0', 100, 10);
    const discountedPrice = book.price.applyDiscount(10);
    expect(discountedPrice.amount).toBeLessThan(book.price.amount);
  });
});
