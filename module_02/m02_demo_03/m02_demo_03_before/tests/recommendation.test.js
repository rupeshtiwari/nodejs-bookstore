const Recommendation = require('../recommendation');

// Demonstrates the need for a Value Object to encapsulate ISBN validation logic,
// highlighting a DDD issue of scattering domain logic across entities.
describe('Recommendation entity validation', () => {
  // This test shows direct validation for ISBN format,
  // indicating a lack of encapsulation and a potential for inconsistent validation.
  test('ISBN format validation upon recommendation creation', () => {
    const validISBN = '978-3-16-148410-0';
    const invalidISBN = '123-4-56-78910-1';

    expect(() => new Recommendation(validISBN, true)).not.toThrow();
    expect(() => new Recommendation(invalidISBN, false)).toThrow(
      'Invalid ISBN format.'
    );
    // The reliance on external validation (helper.js) instead of a robust ISBN Value Object
    // exemplifies a violation of DDD principles, missing the opportunity to ensure
    // business rule integrity and domain model consistency through encapsulated validation.
  });
});
