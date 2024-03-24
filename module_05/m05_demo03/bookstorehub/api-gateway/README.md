```bash
# navigate book management 
cd ~/Code/rupeshtiwari/sourcecode_pluralsight_course/bookstore/module_05/m05_demo02/bookstorehub/src/services/book-management

# start server
npm start

# navigate api-gateway
cd ~/Code/rupeshtiwari/sourcecode_pluralsight_course/bookstore/module_05/m05_demo02/bookstorehub/api-gateway

# start server
npm start

# 1. Traffic Management demo: access books api
curl "http://localhost:3020/api/books?search=NodeJS"

# expected output
[{"id":1,"title":"Node.js Microservices","author":"Jane Doe"},{"id":2,"title":"Advanced Node.js","author":"John Smith"}]

# 2. Rate limiting demo:
# Make 5 successful requests
for i in {1..4}; do 
  curl "http://localhost:3020/api/books?search=NodeJS";
  echo "";  # Add a newline for better readability
done


# Wait a moment (1min) here to simulate a pause in traffic

# Then make additional requests to trigger rate limiting
for i in {1..6}; do 
  curl "http://localhost:3020/api/books?search=NodeJS";
  echo "";  # Add a newline for better readability
done


# 3. Threat Detection Demo:
curl -s "http://localhost:3020/api/books?search=%27OR%271%27=%271" | jq

# output 
{
  "errors": [
    {
      "type": "field",
      "value": "'OR'1'='1",
      "msg": "Search term must be alphanumeric",
      "path": "search",
      "location": "query"
    }
  ]
} 

```



--- 

BookStoreHub/
│
├── src/
│   ├── services/
│   │   ├── book-management/
│   │   │   └── ... # Book management service files
│   │   │
│   │   ├── payment-service/
│   │   │   └── ... # Payment service files
│   │   │
│   │   └── identity-provider/
│   │       └── ... # Identity provider service files
│   │
│   └── api-gateway/
│       ├── server.js  # API gateway server setup with HTTPS
│       ├── routes/
│       │   └── apiRoutes.js  # Routes for proxying to services
│       │
│       ├── middlewares/
│       │   ├── rateLimiter.js  # Rate limiter middleware
│       │   └── threatDetection.js  # Threat detection middleware
│       │
│       └── certs/  # Directory for storing SSL certificate and key
│           ├── server.cert  # SSL certificate
│           └── server.key   # Private key
│
└── package.json  # NPM package configuration
