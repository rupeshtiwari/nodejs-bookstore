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
for i in {1..50}; do 
  curl "http://localhost:3020/api/books?search=NodeJS";
  echo "";  # Add a newline for better readability
done


# 3. Threat Detection Demo: SQL Injection 
curl -s "http://localhost:3020/api/books/search?search='OR%20'1'='1" | jq


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

The specific query part search=' OR '1'='1 is a classic SQL injection technique. If the input is not properly sanitized and is directly used in a SQL command, it could lead to a situation where the SQL command is altered in such a way that it always evaluates to true because '1'='1 is a logical condition that always returns true. For example, in an unsanitized scenario, a SQL query constructed like this:

SELECT * FROM books WHERE title = '' OR '1'='1'

The condition '1'='1' will always be true, potentially returning all records from the books table, thereby bypassing any intended filtering based on the search parameter. This could expose sensitive information or be used as a stepping stone for more severe attacks.
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
