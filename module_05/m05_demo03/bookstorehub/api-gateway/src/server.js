const fs = require('fs');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const apiRoutes = require('./routes/apiRoutes');
const customLimiter = require('./middlewares/rateLimiter');

const app = express();

app.use(helmet()); // Security middleware to set various HTTP headers
app.use(customLimiter); // Apply the custom rate limiter globally

app.use('/api', apiRoutes);

https
  .createServer(
    {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert'),
    },
    app
  )
  .listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
