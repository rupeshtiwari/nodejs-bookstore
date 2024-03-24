
Bookstrehub/
│
├──src/
│
├── identity-provider/        # Centralized Identity Provider for JWT-based authentication
│   ├── src/
│   │   ├── auth/
│   │   │   └── jwtAuth.js    # JWT generation and verification
│   │   └── routes/
│   │       └── authRoutes.js # Login route for JWT issuance
│
├── services/
│   ├── book-management/      # Book management service with RBAC
│   │   ├── src/
│   │   │   ├── middleware/
│   │   │   │   └── rbac.js   # Middleware for enforcing RBAC
│   │   │   └── routes/
│   │   │       └── bookRoutes.js
│   │
│   └── payment-service/      # Simulated external payment service for OAuth2.0
│       ├── src/
│       │   └── oauth/
│       │       └── oauthServer.js # OAuth2.0 setup and token issuance
│
└── common/                   # Shared libraries for AuthN & AuthZ utilities
    ├── auth/
    │   ├── jwtVerify.js      # JWT verification utility used by services
    │   └── oauthClient.js    # OAuth client setup (for demonstration)
    └── accesscontrol/
        └── roles.js          # Access control definitions



```mermaid
sequenceDiagram
    participant U as User
    participant IdP as Identity Provider
    participant GW as API Gateway
    participant TP as Third-party Service
    participant BS as BookStoreHub Services
    
    Note over U,BS: User Authentication with JWT
    U->>+IdP: Login Credentials
    IdP->>-U: JWT Token
    
    Note over U,BS: Attach JWT to Requests
    U->>+GW: Request with JWT
    GW->>+BS: Forward Request
    BS->>-GW: Response
    GW->>-U: Response
    
    Note over U,TP: Third-party Service Authorization with OAuth2.0
    U->>+IdP: Authorize Third-party Access
    IdP->>-TP: OAuth2.0 Access Token
    
    TP->>+BS: Request User Payment Info with Access Token
    BS->>-TP: Provide Payment Info
    
    Note over U,BS: Enforcing RBAC for Different User Roles
    U->>+BS: Attempt Access (e.g., Add New Book)
    BS->>BS: Check Role Permissions
    BS-->>-U: Access Granted or Denied
    
    Note over U,BS: Bringing It All Together
    U->>+BS: Log in and Browse Books
    U->>+BS: Checkout Process
    BS->>+TP: Invoke Payment Service (OAuth2.0)
    TP->>-BS: Access Payment Info
    BS-->>-U: Transaction Complete
    
    U->>+BS: Attempt to Add New Book (Editor Role)
    BS-->>-U: Book Added Successfully
    
    Note over U,BS: Demo Conclusion
    U->>BS: Secure Interactions Demonstrated
```


![alt text](architecture.png)



To run the demo for "Securing BookStoreHub: A Comprehensive AuthN & AuthZ Demo," you'll need to set up your environment and install necessary Node.js libraries. Below are the steps, prerequisites, and how to test each scenario.

### Prerequisites:
- Ensure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
- Install a tool for making HTTP requests (e.g., Postman or cURL) to test the API endpoints.

### Global Setup:
1. **Clone/Create Project Structure**: If you haven't already set up the directory structure as described, please do so.
2. **Environment Variables**: Create a `.env` file in the root of each service where necessary (e.g., `identity-provider`, each service in `services/`) and add the following line:
   ```
   JWT_SECRET=your_jwt_secret
   ```
   Replace `your_jwt_secret` with a secret string of your choosing.

### NPM Libraries to Install:
Navigate to each directory where you have a `package.json` file and run the installation command for these libraries. Here are the commands based on the service:

- **For `identity-provider` and services using JWT**:
  ```bash
  npm install express jsonwebtoken dotenv body-parser
  ```
- **For services using RBAC (`book-management`)**:
  ```bash
  npm install express body-parser
  ```
  Note: Assuming `rbac.js` and `jwtVerify.js` are purely illustrative, and `roles.js` does not require an npm package.

- **For `payment-service` (simulated OAuth2.0 service)**:
  ```bash
  npm install express oauth2orize body-parser dotenv
  ```

### Running the Demo:


To run and test each scenario in your "Securing BookStoreHub" demo comprehensively, you'll need to start each service individually and then use `curl` commands to simulate client requests for each of the outlined scenarios. Below are the detailed steps, including starting the services and the specific `curl` commands for testing.

### Starting Each Service

Assuming you have a basic Express server setup in a `server.js` file located in the `src` directory of each service (`identity-provider`, `book-management`, and `payment-service`), follow these steps to run them:

1. **Navigate to Each Service Directory in Terminal**

For `identity-provider`:
```bash
cd path/to/BookStoreHub/identity-provider
npm install
node src/server.js
```

For `book-management`:
```bash
cd path/to/BookStoreHub/services/book-management
npm install
node src/server.js
```

For `payment-service`:
```bash
cd path/to/BookStoreHub/services/payment-service
npm install
node src/server.js
```

### Testing Scenarios with `curl` Commands
Now that all services are running, let's proceed with the step-by-step testing scenarios according to your demo plan.

### Step 1: User Authentication with JWT

#### Objective:
To securely authenticate a user attempting to log in to BookStoreHub and generate a JWT upon successful login.

#### Actions:
1. **Login and JWT Generation:**
   Use the identity-provider service to authenticate a user and receive a JWT.

```bash
# 1. run identity provider server
  cd  ~/Code/rupeshtiwari/sourcecode_pluralsight_course/bookstore/module_05/m05_demo01/bookstorehub/src/identity-provider
  node ./src/server.js 


 # 2. login 
  curl -X POST http://localhost:3010/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "customer", "password": "custpassword"}'
```

   **Expected Output**: You should receive a response containing a JWT token.

  ```json
  {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzExMjI2MDI3LCJleHAiOjE3MTEyMjk2Mjd9.5wVMTw8Lgxr-Rv4W1Ubkd9QOMQ7j86cHOvYXQc6G-VY"}%    
  ```
 
![alt text](./demo_authn.png)

2. **Attach JWT to Subsequent Requests:**
   Store the received JWT to use as a bearer token in subsequent requests.

```bash
# 1. run book managemenr server
cd ~/Code/rupeshtiwari/sourcecode_pluralsight_course/bookstore/module_05/m05_demo01/bookstorehub/src/services/book-management

node ./src/server.js  

# 2. Get book api without token 
curl -X GET http://localhost:3011/api/books/details/1 \
-H "Authorization: Bearer YOUR_JWT_TOKEN"

# 3. Error output in console 
{"message":"Forbidden"}    
 
# 4. Get book api with token 
 
curl -X GET http://localhost:3011/api/books/details/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzExMjM5MDUwLCJleHAiOjE3MTEyNDI2NTB9.fs5pHBgA2ckIiQnRPjTEOXR8oIYo73y1ihiVCYsto1s"

# 5. Success output in console
{"id":1,"title":"Node.js Microservices","author":"Jane Doe"}

```
### Step 2: Third-party Service Authorization with OAuth2.0

#### Objective:
To authorize a third-party payment service to access user payment information without exposing sensitive credentials.

#### Actions:
1. **Set Up OAuth2.0 Flow:**

  ### Step 1: Register Your Application on GitHub

   1.  Go to your GitHub settings.
       
   2.  Select "Developer settings" from the sidebar.
       
   3.  Click on "OAuth Apps" > "New OAuth App".
       
   4.  Fill in the application details:
       
       -   **Application Name:** Name of your application.
       -   **Homepage URL:** `http://localhost:3012` or your application's homepage.
       -   **Application Description:** (Optional) A brief description of your app.
       -   **Authorization Callback URL:** `http://localhost:3012/oauth/callback`. This is where GitHub redirects back after the user authorizes your application.
   5.  Click "Register application".
       

   After registering, you'll receive a **Client ID** and you'll be able to generate a **Client Secret**. Keep these confidential, especially the Client Secret.

   For demonstration purposes, simulate obtaining an OAuth2.0 access token. Normally this involves several interactions, but you can simulate this using the following `curl` command:

![alt text](./oauth_github_setup.png)


```bash
 # 1. run identity provider server
  cd ~/Code/rupeshtiwari/sourcecode_pluralsight_course/bookstore/module_05/m05_demo01/bookstorehub/src/identity-provider

  node ./src/server.js 
  
 # 2. run payment server
  cd ~/Code/rupeshtiwari/sourcecode_pluralsight_course/bookstore/module_05/m05_demo01/bookstorehub/src/services/payment-service

  node ./src/server.js 

  # 3. login
  curl -X POST http://localhost:3010/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "customer", "password": "custpassword"}'

  # 4. Get JWT token  
  {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzExMjI4NjY4LCJleHAiOjE3MTEyMzIyNjh9.t6KgtmNb6_NScmj2Nt1pp8oXsXnUXOyIwD5GRt-pj8A"}%   

# 5. Make Payment call
curl -X POST http://localhost:3012/api/pay \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzExMjM5NTc5LCJleHAiOjE3MTEyNDMxNzl9.AqUiw865EAm8HCw0qdPX0QYRqFNqrcHxDZhxykuSy_0" \
-d '{"bookId":"123", "cost":10}'

 # 6. Watch console for successful payment message
 {"message":"Payment successful!","orderId":"randomOrderId123"}

```

   **Expected Output**: A simulated response that would include an access token.

![alt text](./oauth_demo_output.png)


### Step 3: Enforcing RBAC for Different User Roles

#### Objective:
To control access to various parts of BookStoreHub based on user roles.

#### Actions:

```bash
  # run Identity Provider Service,
  cd bookstorehub/src/identity-provider
  node ./src/server.js 

  # run Book Management Service
  cd bookstorehub/src/services/book-management
  node ./src/server.js 

  # 1. login with editor
  curl -X POST http://localhost:3010/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "editor", "password": "editorpassword"}'

# 2. JWT token  
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImVkaXRvciIsImlhdCI6MTcxMTIzMDQ2NiwiZXhwIjoxNzExMjM0MDY2fQ.Ga7pZybvlTb7HJenyvRjDO2VdgkQadF-lF0Te5gCd_Q"}

# 3. Add book api call 
curl -X POST http://localhost:3011/api/books/add \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImVkaXRvciIsImlhdCI6MTcxMTIzMDQ2NiwiZXhwIjoxNzExMjM0MDY2fQ.Ga7pZybvlTb7HJenyvRjDO2VdgkQadF-lF0Te5gCd_Q" \
-H "Content-Type: application/json" \
-d '{"title": "New Node.js Best Practices", "author": "Jane Developer"}'


 # 4. Watch console for successful book added message
{"message":"Book added successfully","book":{"id":3,"title":"New Node.js Best Practices","author":"Jane Developer"}}
```

 ![alt text](./demo_payment.png)

### Bringing It All Together

#### Objective:
To illustrate a scenario where JWT authentication, OAuth2.0 authorization, and RBAC are working together.

#### Actions:
1. **Customer Checkout Process:**
   The customer, now authenticated, attempts to checkout, which requires payment processing through the third-party service with OAuth2.0 authorization.

2. **Editor Adds a Book:**
   An editor adds a new book to the inventory, showcasing RBAC, but cannot access admin settings.

### Demo Conclusion:

Summarize the demo by explaining how you've integrated JWT for authentication, OAuth2.0 for authorization, and RBAC for access control. Highlight the importance of these mechanisms in securing microservices and protecting user data and system integrity.

For the testing scenarios to reflect the real flow, you'd have a frontend or a script to coordinate these calls, maintain session state, and handle token storage and transmission. Since this demo is likely command-line based, each call is isolated, but in a real application, these would be interconnected actions within user sessions.



## Appendix

![alt text](image.png)