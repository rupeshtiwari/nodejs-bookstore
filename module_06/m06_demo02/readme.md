
## Module 06 Demo 02: Event-Driven Decomposition Pattern Explained


```
npm install amqplib
```


Install rabbitMQ: https://gist.github.com/rupeshtiwari/fffc021bb0739fdffa20d65b04c61fe0

### Steps to Run the Demo

1.  **Install RabbitMQ:** Ensure RabbitMQ is installed and running on your system.
    
2.  **Install Node.js Dependencies:**
    
    bash Copy code
    
    `npm install amqplib` 
    
3.  **Start the Payment Service:**
    
    -   Save the code for `PaymentService.js` in a file.
    -   Run the service using Node.js:
        
        bash Copy code
        
        `node PaymentService.js` 
        
4.  **Start the BookStoreHub Monolith:**
    
    -   Save the code for `BookStoreHub.js` in a file.
    -   Run the service using Node.js:
        
        bash Copy code
        
        `node BookStoreHub.js` 
        
5.  **Create an Order:**
    
    Test Order Creation**

    ```json

    curl -X POST http://localhost:3020/order \
    -H "Content-Type: application/json" \
    -d '{
      "userId": "user123",
      "items": [
        { "price": 150 },
        { "price": 250 }
      ]
    }'


    # second user
    curl -X POST http://localhost:3020/order \
    -H "Content-Type: application/json" \
    -d '{
      "userId": "user234",
      "items": [
        { "price": 250 },
        { "price": 310 }
      ]
    }'
    
    ```
        
6.  **Verify Payment and Rewards Processing:**
    
 ```
 curl -X GET http://localhost:3020/order-history/user123 
 ```
output

```json
[{"orderId":1699822457537,"userId":"user123","items":[{"price":150},{"price":250}],"total":400}]
```