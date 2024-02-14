const Recommendation = require('../models/recommendation');

describe('Recommendation entity with Value Objects', () => {
  test('Recommendation creation with valid ISBN', () => {
    const recommendation = new Recommendation('978-3-16-148410-0', true);
    expect(recommendation.isbn.value).toEqual('978-3-16-148410-0');
  });
});
