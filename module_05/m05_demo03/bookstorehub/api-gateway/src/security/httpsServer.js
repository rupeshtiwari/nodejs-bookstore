const fs = require('fs');
const path = require('path');
const https = require('https');

function createHttpsServer(app) {
  const keyPath = path.join(__dirname, '..', 'certs', 'server.key');
  const certPath = path.join(__dirname, '..', 'certs', 'server.cert');

  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  const server = https.createServer(options, app);

  return server;
}

module.exports = createHttpsServer;
