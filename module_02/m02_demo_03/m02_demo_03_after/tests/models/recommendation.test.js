const Recommendation = require('../../models/recommendatioin');

// This set of tests verifies that Recommendation entities handle ISBNs correctly using value objects.
describe('Recommendation entity with Value Objects', () => {
  // Confirms that the Recommendation entity uses the ISBN value object for validation.
  test('Recommendation creation with valid ISBN', () => {
    const recommendation = new Recommendation('978-3-16-148410-0', true);
    expect(recommendation.isbn.value).toEqual('978-3-16-148410-0');
  });
});
