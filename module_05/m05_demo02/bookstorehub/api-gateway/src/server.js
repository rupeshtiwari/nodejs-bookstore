const express = require('express');
const helmet = require('helmet');
const apiRoutes = require('./routes/apiRoutes');
const customLimiter = require('./middlewares/rateLimiter');

const app = express();

app.use(helmet()); // Security middleware to set various HTTP headers
app.use(customLimiter); // Apply the custom rate limiter globally
 

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
