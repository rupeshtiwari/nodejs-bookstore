const app = require('./app'); // Import the configured Express app

const PORT = process.env.PORT || 3000; // Use the environment's port or default to 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Confirmation the server is running
});
