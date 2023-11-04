
## Module 06 Demo 01: Strangler Pattern Explained
Demo: Walk through applying the Strangler pattern to refactor a specific component of the BookStoreHub.
 

To run the demo of the monolithic BookStoreHub application, you can follow these steps:

**Steps to Run the before code Demo:**

1. Start the server by running `node bookstorehub.js`.
   **Expected Output:**
   ```
   BookStoreHub Monolith running on port 3020

   ```
2. Use an API testing tool like Postman or `curl` to make requests to the server.

**Payloads and Expected Outputs:**

To create an order:
```bash
curl -X POST http://localhost:3020/order \
-H "Content-Type: application/json" \
-d '{"userId": 1, "items": [{"price": 120}, {"price": 80}]}'
```
**Expected Output:**
```json
{
  "message": "Order created",
  "order": {
    "orderId": 1699057446834,
    "userId": 1,
    "items": [{"price": 120}, {"price": 80}],
    "total": 200
  },
  "points": 20
}
```

To retrieve order history for a user:
```bash
curl http://localhost:3020/order-history/1
```
**Expected Output:**
```json
[
  {
    "orderId": 1699057446834,
    "userId": 1,
    "items": [{"price": 120}, {"price": 80}],
    "total": 200
  }
  // ... other orders ...
]
```

To retrieve rewards for a user:
```bash
curl http://localhost:3020/rewards/1
```
**Expected Output:**
```json
{
  "userId": 1,
  "points": 20
}
```

To retrieve payment information for an order:
```bash
curl http://localhost:3020/payment/1699057446834
```
**Expected Output:**
```json
{
  "userId": 1,
  "amount": 200
}
```


**Issues with the Current Monolithic Code:**

1. **Tight Coupling:** The order processing, history, rewards, and payments are all tightly coupled, making it hard to maintain and scale.
2. **Single Point of Failure:** If there's an issue in one part of the application, it can affect the entire system.
3. **Difficulty in Implementing New Features:** New features or changes could require a complete redeployment of the monolith.
4. **Scalability Issues:** It's challenging to scale parts of the application independently based on their individual needs.
5. **Lack of Isolation:** Failure in one module (like payment processing) can lead to complete system downtime.
6. **Complexity:** As the application grows, its complexity increases, making it harder for new developers to understand the entire system.

By refactoring into microservices, you can mitigate these issues, allowing each service to be developed, deployed, and scaled independently.