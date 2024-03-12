// src/controllers/bookController.js
const BookService = require('../services/bookService');

const getBookOfTheMonth = async (req, res) => {
  try {
    const bookDetails = await BookService.getBookOfTheMonth();
    res.json(bookDetails);
  } catch (error) {
    res.status(500).send('Error fetching Book of the Month.');
  }
};

module.exports = { getBookOfTheMonth };
