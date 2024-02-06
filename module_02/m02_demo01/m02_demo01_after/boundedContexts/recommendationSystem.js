let recommendations = [
  { bookId: 'B1001', recommended: true },
  { bookId: 'B1002', recommended: true },
];

const updateRecommendation = (bookId, recommended) => {
  const recommendation = recommendations.find((r) => r.bookId === bookId);
  if (recommendation) {
    recommendation.recommended = recommended;
  }
};

module.exports = { recommendations, updateRecommendation };
