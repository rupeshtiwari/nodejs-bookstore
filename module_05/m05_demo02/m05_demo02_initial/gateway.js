const express = require('express');
const app = express();
const PORT = 3009;

// Simple API Gateway without any security
app.all('/api/*', (req, res) => {
  // Forward the request to the respective service
  // For simplicity, just sending a response here
  res.send('Request forwarded to service!');
});

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
