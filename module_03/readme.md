Demo 1: Implementing Event Sourcing for the BookStoreHub's Order Service
------------------------------------------------------------------------

### Initial Setup:

1.  Initialize a new Node.js project: `npm init -y`
2.  Install required packages: `npm install express`
### Initial Code:

**orderService.js**:

```javascript
const express = require('express');
const orderService = express();

orderService.use(express.json());

orderService.post('/order', (req, res) => {
    const order = {
        id: Date.now(),
        items: req.body.items,
        total: req.body.items.reduce((acc, item) => acc + item.price, 0)
    };
    res.status(201).send(order);
});

orderService.listen(3003, () => {
    console.log('Order Service started on port 3003');
});

```

### After Code:

Incorporating event sourcing:


**orderService.js**:

```javascript
const express = require('express');
const orderService = express();
const eventStore = [];

orderService.use(express.json());

orderService.post('/order', (req, res) => {
    const orderCreatedEvent = {
        type: 'OrderCreated',
        data: {
            id: Date.now(),
            items: req.body.items,
            total: req.body.items.reduce((acc, item) => acc + item.price, 0)
        }
    };
    eventStore.push(orderCreatedEvent);
    res.status(201).send(orderCreatedEvent.data);
});

orderService.listen(3003, () => {
    console.log('Order Service started on port 3003');
});

```
### Endpoint:

`POST http://localhost:3003/order`

### Payload:
```json
{
    "items": [
        {
            "id": 1,
            "title": "Book A",
            "price": 10
        },
        {
            "id": 2,
            "title": "Book B",
            "price": 15
        }
    ]
}
```

To retrieve all the events stored in the event store:

### Endpoint:

`GET http://localhost:3004/events`


Demo 2: Setting Up an Event Store for the BookStoreHub
------------------------------------------------------

### Initial Setup:

1.  Use the existing Node.js project.
2.  Install required packages: `npm install express`
### Initial Code:

**eventStoreService.js**:
```javascript
const express = require('express');
const eventStoreService = express();

eventStoreService.use(express.json());

eventStoreService.listen(3004, () => {
    console.log('Event Store Service started on port 3004');
});

```
### After Code:

Incorporating the event store:


**eventStoreService.js**:

```javascript
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

```
### Endpoint:

`POST http://localhost:3004/events`

### Payload:
```json
{
    "type": "OrderCreated",
    "data": {
        "orderId": 12345,
        "items": [
            {
                "id": 1,
                "title": "Book A",
                "price": 10
            }
        ]
    }
}
```


Demo 3: Creating Projections for the BookStoreHub's Inventory Service
---------------------------------------------------------------------
### Initial Setup:

1.  Use the existing Node.js project.
2.  Install required packages: `npm install express`


### Initial Code:

**inventoryService.js**:
```javascript

const express = require('express');
const inventoryService = express();

const inventory = {};

inventoryService.use(express.json());

inventoryService.get('/inventory', (req, res) => {
    res.json(inventory);
});

inventoryService.listen(3005, () => {
    console.log('Inventory Service started on port 3005');
});

```

### After Code:

Incorporating projections:


**inventoryService.js**:

```javascript
const express = require('express');
const inventoryService = express();

const inventory = {};

inventoryService.use(express.json());

// Listen to the event store and update the inventory based on events
const updateInventory = (event) => {
    if (event.type === 'OrderCreated') {
        event.data.items.forEach(item => {
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

```

### Endpoint:

`POST http://localhost:3005/events`

### Payload:
```json
{
    "type": "OrderCreated",
    "data": {
        "orderId": 12345,
        "items": [
            {
                "id": 1,
                "title": "Book A",
                "price": 10
            }
        ]
    }
}
```
To retrieve the updated inventory:

### Endpoint:
```json
GET http://localhost:3005/inventory
```
