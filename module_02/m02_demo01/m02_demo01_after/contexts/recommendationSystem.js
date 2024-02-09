// recommendationSystem.js

// This array is meant to simulate a database of book recommendations.
let recommendations = [
  { bookId: 'B1001', recommended: true },
  { bookId: 'B1002', recommended: true },
];

/**
 * Updates the recommendation status for a given book.
 * @param {string} bookId The ID of the book.
 * @param {boolean} recommended The new recommendation status.
 */
function updateRecommendation(bookId, recommended) {
  const recommendation = recommendations.find((r) => r.bookId === bookId);
  if (recommendation) {
    recommendation.recommended = recommended;
  }
}

/**
 * Retrieves the recommendation status for a given book.
 * This method is intended for testing purposes only.
 * @param {string} bookId The ID of the book to retrieve the status for.
 * @returns {boolean|null} The recommended status, or null if the book is not found.
 */
function getRecommendationStatusForTest(bookId) {
  const recommendation = recommendations.find((r) => r.bookId === bookId);
  return recommendation ? recommendation.recommended : null;
}

module.exports = { updateRecommendation, getRecommendationStatusForTest };
