// Mock book data
const books = [
  { bookId: 'book1', price: 20 },
  { bookId: 'book2', price: 15 },
  // Add more books as needed
];

exports.getBookDetails = async (bookId) => {
  // Simulate fetching book details from a database or another microservice
  const book = books.find((book) => book.bookId === bookId);
  if (!book) throw new Error('Book not found');
  return { bookId, price: book.price };
};
