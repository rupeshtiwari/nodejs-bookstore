Demo: Defining Bounded Contexts for the BookStoreHub Platform
-------------------------------------------------------------

### Initial Code:

In the initial phase, you might have a monolithic application where everything is bundled together without clear boundaries.

**bookStore.js**:



```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/createBook', (req, res) => {
    // Logic to create a book
});

app.post('/createOrder', (req, res) => {
    // Logic to create an order
});

app.listen(3000, () => {
    console.log('BookStoreHub started on port 3000');
});

```

### After Code:

After introducing the concept of bounded contexts, you separate the concerns into distinct services, each representing a different context.

**bookService.js**:
```javascript
const express = require('express');
const bookService = express();

bookService.use(express.json());

bookService.post('/createBook', (req, res) => {
    // Logic to create a book
});

bookService.listen(3001, () => {
    console.log('Book Service started on port 3001');
});

```
**orderService.js**:
```javascript


const express = require('express');
const orderService = express();

orderService.use(express.json());

orderService.post('/createOrder', (req, res) => {
    // Logic to create an order
});

orderService.listen(3002, () => {
    console.log('Order Service started on port 3002');
});
```
**Learning Outcome**: The audience will understand the importance of defining clear boundaries in a microservices architecture. They'll learn how to separate concerns and create distinct services for each bounded context.


Demo: Designing the Book Entity for the BookStoreHub
----------------------------------------------------

### Initial Code:

Initially, a book might just be represented as a simple object without any behavior.

**book.js**:


```javascript
class Book {
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
}

```


### After Code:

After introducing DDD principles, the book entity might encapsulate behavior and ensure invariants.

**bookEntity.js**:

```javascript
class Book {
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.setPrice(price);
    }

    setPrice(price) {
        if (price <= 0) {
            throw new Error('Price must be positive');
        }
        this.price = price;
    }

    applyDiscount(discountPercentage) {
        if (discountPercentage < 0 || discountPercentage > 100) {
            throw new Error('Invalid discount percentage');
        }
        this.price = this.price * (1 - discountPercentage / 100);
    }
}

```



Demo: Implementing a Price Value Object for Books
-------------------------------------------------

### Initial Code:

Initially, the price might just be represented as a simple number.

**book.js**:

```javascript
class Book {
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
}

```


### After Code:

After introducing DDD principles, the price is represented as a value object, ensuring immutability and encapsulating behavior.

**priceValueObject.js**:

```javascript
class Price {
    constructor(amount) {
        if (amount <= 0) {
            throw new Error('Price must be positive');
        }
        this.amount = amount;
    }

    add(otherPrice) {
        return new Price(this.amount + otherPrice.amount);
    }

    subtract(otherPrice) {
        return new Price(this.amount - otherPrice.amount);
    }

    equals(otherPrice) {
        return this.amount === otherPrice.amount;
    }
}

```

**Learning Outcome**: The audience will grasp the concept of value objects in DDD. They'll learn how value objects are immutable and how they encapsulate domain logic related to specific values.
