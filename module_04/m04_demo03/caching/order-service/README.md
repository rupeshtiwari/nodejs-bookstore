

## Caching load testing steps

**Step 1: without cachine benchmarking**

```bash
# 1. navigate to caching/order-service & run server
npm i
node ./server.js

# 2. create order
curl -X POST http://localhost:3006/orders -H "Content-Type: application/json" -d '{"orderId": 1, "status": "Processing"}'

# 3. run load test in new terminal
artillery run load_test.yaml
```


**Step 2: with cachine benchmarking**

```bash
# 1. navigate to caching/order-service & run server
node ./server-with-caching.js

# 2. update load_test.yaml port (3007) to point new server

# 3. create order
curl -X POST http://localhost:3007/orders -H "Content-Type: application/json" -d '{"orderId": 1, "status": "Processing"}'

# 4. run load test in new terminal
artillery run load_test.yaml
```