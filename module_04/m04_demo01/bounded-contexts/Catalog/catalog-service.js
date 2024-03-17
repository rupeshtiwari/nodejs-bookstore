const http = require('http');

// Simulated in-memory "database" for book catalog
const books = [
  { id: 1, title: 'Node.js Design Patterns', author: 'Mario Casciaro' },
  { id: 2, title: 'You Don’t Know JS', author: 'Kyle Simpson' },
];

const requestHandler = (request, response) => {
  console.log(`Received request on port ${process.env.PORT}`);
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(books));
};

const server = http.createServer(requestHandler);

const port = process.env.PORT || 8080;
server.listen(port, (err) => {
  if (err) {
    return console.log('An error occurred', err);
  }
  console.log(`Server is listening on ${port}`);
});
