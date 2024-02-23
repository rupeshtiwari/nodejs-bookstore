const express = require('express');
const mongoose = require('mongoose');
const orderController = require('./src/controllers/orderController');

require('dotenv').config();
// Use process.env.MONGODB_URI where you connect to MongoDB

const app = express();

// Middleware and route setup
app.use(express.json());
app.use('/api', orderController);

// Mongo Db connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection failed:', error.message));

// Export the Express app
module.exports = app;

// Application hosting
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
