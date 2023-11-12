
const { Client } = require('@opensearch-project/opensearch');
const winston = require('winston');

 
const host = '127.0.0.1';
const protocol = 'https'; // <-- Changing http to https worked.
const ports = [9200, 9600];
const auth = 'admin:admin'; // For testing only. Don't store credentials in code.

// OpenSearch client configuration
const opensearchClient = new Client({
  nodes: [
    protocol + '://' + auth + '@' + host + ':' + ports[0],
    protocol + '://' + auth + '@' + host + ':' + ports[1],

  ],
  ssl: {
    rejectUnauthorized: false,
  },
});

// Custom Winston transport for OpenSearch
class OpenSearchTransport extends winston.Transport {
  constructor(options) {
    super(options);
    this.name = 'opensearchTransport';
    this.level = options.level || 'info';
  }

  log(info, callback) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message: info.message,
    };

    // Index the log entry in OpenSearch
    opensearchClient
      .index({
        index: 'bookstore-log', // Replace with your desired index name
        body: logEntry,
      })
      .then((response) => {
       // console.log('Log entry indexed:', response.body);
      })
      .catch((err) => {
        console.error('Error indexing log entry:', err);
      });

    callback();
  }
}

// Create a Winston logger instance with the custom OpenSearch transport
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'app.log' }), // File transport
    new OpenSearchTransport({ level: 'info' }), // Custom OpenSearch transport,
    new winston.transports.Console(), // Console transport
  ],
});

// Log a test message to verify that logging is working
logger.info('Logger initialized successfully.');

module.exports = logger;
