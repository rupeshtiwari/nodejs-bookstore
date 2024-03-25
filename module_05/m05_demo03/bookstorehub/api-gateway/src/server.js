const express = require('express');
const helmet = require('helmet');
const apiRoutes = require('./routes/apiRoutes');
const customLimiter = require('./middlewares/rateLimiter');
const createHttpsServer = require('./security/httpsServer');

const app = express();

app.use(helmet()); // Security middleware to set various HTTP headers
app.use(customLimiter); // Apply the custom rate limiter globally
app.use('/api', apiRoutes);

const httpsServer = createHttpsServer(app);
httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
