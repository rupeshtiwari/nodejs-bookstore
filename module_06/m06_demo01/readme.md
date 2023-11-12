
## Module 06 Demo 01: Strangler Pattern Explained
Demo: Walk through applying the Strangler pattern to refactor a specific component of the BookStoreHub.
 

To run the demo of the monolithic BookStoreHub application, you can follow these steps:

### Steps to Run the before code Demo

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



### Steps to Run the after code Demo

To test the new `bookstorehub.js`, which uses a load balancer to route requests to either the monolith or the microservice for reward calculations, follow these steps:

**Prerequisites:**

- Make sure Node.js is installed on your system.
- Ensure `loadBalancer.js`, `monolithRewards.js`, and `rewardsService.js` are correctly set up and in the correct directories.
- Install any necessary npm packages that these files require.
- Start both the monolith rewards service (`monolithRewards.js`) on port 3001 , the rewards microservice (`rewardsService.js`) on port 3002 and `bookstorehub.js` on port 3003.

**Step 1: Start the Services**

- Run `node monolithRewards.js` to start the monolith rewards service.
- Run `node rewardsService.js` to start the new rewards microservice.

**Step 2: Start the BookStoreHub**

- Run `node bookstorehub.js` to start the main BookStoreHub application.

**Step 3: Test Order Creation**

  ```json

  curl -X POST http://localhost:3003/order \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "items": [
      { "price": 150 },
      { "price": 250 }
    ]
  }'


  # second user
  curl -X POST http://localhost:3003/order \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user234",
    "items": [
      { "price": 250 },
      { "price": 310 }
    ]
  }'
  
  ```

  - Expected Output: A successful response indicating that the order was created and rewards were processed. The output should also include whether the monolith or the microservice processed the rewards.

**Step 4: Test Retrieving User Rewards**

  ```
  curl -X GET http://localhost:3003/rewards/user123
  ```


  - Expected Output: A successful response containing the rewards points for the user. The output should also indicate whether the monolith or the microservice retrieved the rewards.

**Step 5: Observe Logs**

- Observe the console logs for both the monolith and microservice. You should see logs indicating which service processed the rewards for both creating an order and retrieving rewards. This will verify that the load balancer is routing requests correctly.

**Step 6: Test Multiple Times**

- Repeat steps 3 and 4 multiple times. Due to the load balancer's traffic splitting configuration, you should occasionally see the rewards being processed or retrieved by the microservice, according to the specified percentage (e.g., 20% microservice, 80% monolith).

If you encounter errors or the outputs are not as expected, verify the following:

- All services are running on the correct ports.
- The `loadBalancer.js` is properly configured and pointing to the correct endpoints.
- The POST and GET routes in `bookstorehub.js` are correctly invoking the `LoadBalancer` route method.
- The `monolithRewards.js` and `rewardsService.js` endpoints are correctly implemented and are able to respond to the requests.

By following these steps, you should be able to test the routing logic implemented in `bookstorehub.js` and validate the functionality of your load balancer in handling reward point calculations and retrieval.