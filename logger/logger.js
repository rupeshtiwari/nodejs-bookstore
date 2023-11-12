const winston = require('winston');
require('winston-elasticsearch');

// Configure Elasticsearch transport
const esTransportOpts = {
  level: 'debug', // Set the desired log level
  index: 'my-node-app', // Elasticsearch index name
  type: 'logs', // Elasticsearch document type
  ensureMappingTemplate: true,
  mappingTemplate: {
    properties: {
      timestamp: { type: 'date' },
      level: { type: 'keyword' },
      message: { type: 'text' },
    },
  },
  clientOpts: {
    node: 'https://localhost:9200', // Use HTTPS protocol
    auth: {
      username: 'admin', // Elasticsearch username
      password: 'admin', // Elasticsearch password
    },
    ssl: {
      rejectUnauthorized: false, // Ignore self-signed SSL certificate (for development)
    },
  },
};

const elasticsearchTransport = new winston.transports.Elasticsearch(
  esTransportOpts
);
elasticsearchTransport.on('error', (err) => {
  console.error('Error occurred in Elasticsearch transport:', err);
  // Handle the error as needed
});

// Create a Winston logger instance
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Use JSON formatting
  ),
  transports: [
    elasticsearchTransport, // Elasticsearch transport
    new winston.transports.Console(), // Console transport
    new winston.transports.File({ filename: 'app.log' }), // File transport
  ],
});

module.exports = logger;
