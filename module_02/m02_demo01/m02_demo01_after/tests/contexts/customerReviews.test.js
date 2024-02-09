const { addReview } = require('../../contexts/customerReviews');

describe('Customer Reviews', () => {
  it('adds a review successfully', () => {
    const result = addReview('B1001', 'Loved it', 5);
    expect(result.message).toBe('Review added successfully');
  });
});
