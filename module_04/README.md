### Module 3: Scaling and Optimizing Your Microservices

#### Learning Goals:

-   Learn strategies to scale microservices and optimize their performance.

#### Concepts Covered:

-   Load Balancing
-   Service Discovery
-   Database Sharding
-   Caching

#### Initial Setup:

1.  Ensure you have Node.js and npm installed.
2.  Install the required npm packages:
3.  Set up a PostgreSQL database and create the necessary tables.

#### Introduction to Microservices Scaling:

**Concepts**:

-   Why scale?
-   Horizontal vs. Vertical scaling.

#### Load Balancing in Microservices:

**Before Code**:

Here's a simple Express server without load balancing:

```plaintext
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Server!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

```

**After Code**:

To implement load balancing, we'll use a reverse proxy like NGINX. Here's a basic NGINX configuration to load balance between two servers:

```plaintext
http {
    upstream backend {
        server localhost:3000;
        server localhost:3001;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
        }
    }
}

```

**Concepts Learned**:

-   The role of load balancers in distributing traffic.
-   Setting up a basic load balancer using NGINX.

#### Service Discovery Patterns:

**Before Code**:

A simple service that doesn't have service discovery implemented:

```plaintext
const express = require('express');
const app = express();

app.get('/service', (req, res) => {
    res.send('Service response');
});

app.listen(3001, () => {
    console.log('Service running on port 3001');
});

```

**After Code**:

Implementing service discovery using a simple registry:

```plaintext
const services = {
    service1: 'http://localhost:3001',
    service2: 'http://localhost:3002'
};

app.get('/discover/:serviceName', (req, res) => {
    const service = services[req.params.serviceName];
    if (service) {
        res.send(service);
    } else {
        res.status(404).send('Service not found');
    }
});

```

**Concepts Learned**:

-   The importance of service discovery in a microservices architecture.
-   Implementing a basic service registry.

#### Database Sharding and Caching:

**Before Code**:

A simple database connection without sharding:

```plaintext
const { Client } = require('pg');
const client = new Client({
    connectionString: 'postgres://user:password@localhost:5432/mydb'
});
client.connect();

```

**After Code**:

Implementing basic database sharding logic:

```plaintext
const shard1 = new Client({
    connectionString: 'postgres://user:password@localhost:5432/shard1'
});
const shard2 = new Client({
    connectionString: 'postgres://user:password@localhost:5432/shard2'
});

const getShard = (userId) => {
    return userId % 2 === 0 ? shard1 : shard2;
};

```

**Concepts Learned**:

-   The need for database sharding in large-scale applications.
-   Implementing basic sharding logic at the application level.

#### Conclusion:

In this module, we explored various strategies to scale and optimize microservices. From load balancing to service discovery and database sharding, we delved deep into the techniques that allow for efficient and scalable microservice architectures.

```plaintext
npm install express pg
```

The code you provided is using the `pg` package in Node.js to connect to PostgreSQL databases. The `pg` package is a client library that allows Node.js applications to communicate with PostgreSQL databases.

To make the code work:

**Install the** `**pg**` **package**: This can be done using npm (Node.js package manager) with the command `npm install pg`. This will allow your Node.js application to use the PostgreSQL client library to connect to a PostgreSQL database.

**Install PostgreSQL on your computer**: The `pg` package is just a client library. You also need to have PostgreSQL installed on your computer (or accessible from your computer if it’s hosted elsewhere). The connection strings you provided (`'postgres://user:password@localhost:5432/shard1'` and `'postgres://user:password@localhost:5432/shard2'`) indicate that you’re trying to connect to PostgreSQL databases running on your local machine (`localhost`) on the default PostgreSQL port (`5432`). The databases are named `shard1` and `shard2`.

**Setup the PostgreSQL databases**: After installing PostgreSQL, you’ll need to create the `shard1` and `shard2` databases and set up the necessary tables and data. You’ll also need to ensure that the `user` and `password` in your connection strings have the necessary permissions to access and modify these databases.

**Run the Node.js application**: Once the above steps are completed, you can run your Node.js application, and it should be able to connect to the PostgreSQL databases using the provided connection strings.

In summary, both the `pg` package in Node.js and the PostgreSQL database software need to be set up for the code to work. The `pg`
