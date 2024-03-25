```bash
# navigate to /certs folder and run below script 
openssl req -nodes -new -x509 -keyout server.key -out server.cert
 
# navigate book management 
cd ~/Code/rupeshtiwari/sourcecode_pluralsight_course/bookstore/module_05/m05_demo03/bookstorehub/src/services/book-management

# start server
npm start

# navigate api-gateway
cd ~/Code/rupeshtiwari/sourcecode_pluralsight_course/bookstore/module_05/m05_demo03/bookstorehub/api-gateway

# start server
npm start

# make https call 
curl -s -k "https://localhost/api/books?search=NodeJS" | jq

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
