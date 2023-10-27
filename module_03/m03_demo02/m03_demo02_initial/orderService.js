const express = require('express');
const axios = require('axios');
const orderService = express();

orderService.post('/order', async (req, res) => {
  const bookDetails = await axios.get(
    'http://localhost:3001/books/' + req.body.bookId
  );
  // Process order with bookDetails
});

orderService.listen(3003, () => {
  console.log('Order Service started on port 3003');
});
