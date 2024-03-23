const express = require('express');
const bodyParser = require('body-parser');
 
const authRoutes = require('./routes/authRoutes'); // Using relative path
require('dotenv').config({ path: '../../../../bookstorehub/.env' });

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Identity Provider running on port ${PORT}`);
});
