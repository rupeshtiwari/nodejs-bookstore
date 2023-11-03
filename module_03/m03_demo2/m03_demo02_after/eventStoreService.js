const express = require('express');
const eventStoreService = express();

const events = [];

eventStoreService.use(express.json());

eventStoreService.post('/events', (req, res) => {
  events.push(req.body);
  res.status(201).send({ message: 'Event stored successfully!' });
});

eventStoreService.get('/events', (req, res) => {
  res.json(events);
});

eventStoreService.listen(3004, () => {
  console.log('Event Store Service started on port 3004');
});
