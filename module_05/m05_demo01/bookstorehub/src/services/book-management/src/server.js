const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');


const app = express();
app.use(bodyParser.json());

// Directly use bookRoutes without globally applying rbacMiddleware
app.use('/api/books', bookRoutes); // This attaches only bookRoutes

const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Book Management running on port ${PORT}`);
});
