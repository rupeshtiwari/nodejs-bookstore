const books = [];

const saveBook = (book) => {
  books.push(book);
};

const fetchAllBooks = () => {
  return books;
};

module.exports = {
  saveBook,
  fetchAllBooks,
};
