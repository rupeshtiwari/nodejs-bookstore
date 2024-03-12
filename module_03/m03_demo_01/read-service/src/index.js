// src/index.js
const express = require('express');
const { getBookOfTheMonth } = require('./controllers/bookController');

const app = express();
const PORT = process.env.PORT || 3007;

app.get('/book-of-the-month', getBookOfTheMonth);

app.listen(PORT, () => {
  console.log(`Read Service running on port ${PORT}`);
});
