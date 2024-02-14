const {
  updateRecommendation,
  getRecommendationStatusForTest,
} = require('../../contexts/recommendationSystem');

describe('Recommendation System', () => {
  it('updates recommendation status correctly', () => {
    // Arrange
    const bookId = 'B1001';
    const newStatus = false;

    // Act
    updateRecommendation(bookId, newStatus);

    // Assert
    expect(getRecommendationStatusForTest(bookId)).toBe(newStatus);
  });
});
