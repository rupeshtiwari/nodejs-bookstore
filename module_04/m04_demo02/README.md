 
# Module 4 Demo 2: Node.js Microservices with Consul Service Discovery

## Overview

This repository contains the demo for Module 4, Demo 2 of the Pluralsight course on advanced Node.js microservices. It showcases the implementation of service discovery using Consul by HashiCorp.

## Prerequisites

Before running this demo, make sure you have the following installed:
- Node.js (version specified in `package.json`)
- Consul by HashiCorp

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the `payment-service` and `order-service` directories and run `npm install` to install dependencies.
3. Start Consul in development mode by running `consul agent -dev` in a separate terminal.
4. Start the `payment-service` and `order-service` by navigating to their respective directories and running `npm start`.

## Services

- **Payment Service**: Simulates payment processing on port 3005.
- **Order Service**: Handles order creation and communicates with the payment service via Consul on port 4000.

## Consul Service Discovery

Consul is used to register services and provide service discovery to enable the `order-service` to locate and communicate with the `payment-service`.

## Repository Structure

```plaintext
bookstore-hub/
  ├── payment-service/
  │   ├── package.json
  │   ├── app.js
  │   └── consul.js
  ├── order-service/
  │   ├── package.json
  │   ├── app.js
  │   └── consul.js
  └── consul/
      └── config.json
```

## Usage

After starting the services and Consul, you can create an order by sending a POST request to the `order-service`:

```bash
curl -X POST http://localhost:4000/create-order
```

You should receive a JSON response indicating the order status and payment processing result.

## High Availability and Load Balancing

This demo operates in a development setup. For production, ensure high availability of your Consul cluster and integrate a load balancer to distribute traffic across multiple instances of your services.

## Best Practices

Refer to the best practices we've discussed, such as lightweight health checks, centralized configuration, and graceful failure handling, to ensure your microservices architecture is robust and resilient.

## Questions & Contributions

For questions about this demo or to contribute to the project, please open an issue or pull request in this repository.

Thank you for exploring advanced Node.js microservices with us!
 