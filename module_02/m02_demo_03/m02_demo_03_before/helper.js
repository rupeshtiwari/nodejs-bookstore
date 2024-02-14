// helper.js
function isValidISBN(isbn) {
  return /^97[89]-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/.test(isbn);
}

module.exports = { isValidISBN };
