// src/services/bookService.js
const { getAsync, setAsync } = require('../config/redisConfig');

class BookService {
  static async getBookOfTheMonth() {
    try {
      let bookDetails = await getAsync('bookOfTheMonth');
      if (!bookDetails) {
        // Simulate fetching from database
        bookDetails = JSON.stringify({
          title: 'Example Book',
          author: 'Author Name',
        });
        await setAsync('bookOfTheMonth', bookDetails, 'EX', 10); // Expire in 10 seconds
      }
      return JSON.parse(bookDetails);
    } catch (error) {
      console.error('Error fetching Book of the Month:', error);
      throw error;
    }
  }
}

module.exports = BookService;
