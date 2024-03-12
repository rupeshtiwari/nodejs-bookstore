// src/config/redisConfig.js
const redis = require('redis');
const { promisify } = require('util');

// Load environment variables
require('dotenv').config();

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on('error', (error) => console.error(`Redis Client Error: ${error}`));

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = { getAsync, setAsync };
