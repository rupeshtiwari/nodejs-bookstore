const express = require('express');
const app = express();

app.use(express.json());

app.post('/createBook', (req, res) => {
  // Logic to create a book
});

app.post('/createOrder', (req, res) => {
  // Logic to create an order
});

app.listen(3000, () => {
  console.log('BookStoreHub started on port 3000');
});
