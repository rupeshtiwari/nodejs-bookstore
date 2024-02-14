const Recommendation = require('./recommendation');

describe('Recommendation entity validation', () => {
  test('ISBN format validation upon recommendation creation', () => {
    const validISBN = '978-3-16-148410-0';
    const invalidISBN = '123-4-56-78910-1';

    expect(() => new Recommendation(validISBN, true)).not.toThrow();
    expect(() => new Recommendation(invalidISBN, false)).toThrow(
      'Invalid ISBN format.'
    );
  });
});
