const axios = require('axios');

// Replace with the URL of your gateway or service that you want to flood.
const targetUrl = 'http://localhost:3009/api/test';

// Number of concurrent requests to send.
const concurrentRequests = 100900;

// Interval between requests (in milliseconds).
const requestInterval = 10;

// Function to send a single request.
async function sendRequest() {
  try {
    const response = await axios.get(targetUrl);
    console.log('Request sent. Response status:', response.status);
  } catch (error) {
    console.error(
      'Request failed. Error:',
      error.response ? error.response.status : error.message
    );
  }
}


// Function to flood with concurrent requests.
async function flood() {
  console.log(
    `Flooding ${targetUrl} with ${concurrentRequests} concurrent requests...`
  );
  const promises = [];

  for (let i = 0; i < concurrentRequests; i++) {
    promises.push(sendRequest());
    await new Promise((resolve) => setTimeout(resolve, requestInterval));
  }

  await Promise.all(promises);
  console.log('Flood complete.');
}

// Start the flood.
flood();
