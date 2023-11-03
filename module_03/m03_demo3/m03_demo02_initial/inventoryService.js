const express = require('express');
const inventoryService = express();

const inventory = {};

inventoryService.use(express.json());

// Listen to the event store and update the inventory based on events
const updateInventory = (event) => {
  if (event.type === 'OrderCreated') {
    event.data.items.forEach((item) => {
      if (!inventory[item.id]) {
        inventory[item.id] = { ...item, count: 0 };
      }
      inventory[item.id].count -= 1;
    });
  }
};

// Mock endpoint to simulate receiving events from the event store
inventoryService.post('/events', (req, res) => {
  updateInventory(req.body);
  res.status(200).send({ message: 'Inventory updated successfully!' });
});

inventoryService.get('/inventory', (req, res) => {
  res.json(inventory);
});

inventoryService.listen(3005, () => {
  console.log('Inventory Service started on port 3005');
});
