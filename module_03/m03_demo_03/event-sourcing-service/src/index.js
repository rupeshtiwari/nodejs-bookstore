// src/index.js
const updateReadModel = require('./consumers/readModelUpdater');

updateReadModel().then(() => console.log('Read model updater started.'));
