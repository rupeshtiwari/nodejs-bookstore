const express = require('express');
const eventStoreService = express();

eventStoreService.use(express.json());

eventStoreService.listen(3004, () => {
  console.log('Event Store Service started on port 3004');
});
