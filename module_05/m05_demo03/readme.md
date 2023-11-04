
## Module 05: Demo 03: Data Encryption and Secure Communication
> Demo: You will implement data encryption strategies for sensitive data within the BookStoreHub, ensuring data privacy and integrity




For Module 5, Demo 3, we're focusing on implementing data encryption and secure communication within the BookStoreHub project, specifically within the context of the UserService. We will be using HTTPS for secure communication, JWTs for secure data transmission, and mTLS for service-to-service communication.

**UserService with Data Encryption and Secure Communication:**

**Initial Code:**
Assuming the UserService is currently serving HTTP traffic and handling user data without encryption.

### Refactoring code 

1. **Generate SSL/TLS Certificates:**
   First, generate self-signed certificates for development purposes using OpenSSL. For production, use certificates issued by a trusted CA.
   ```shell
   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj '/CN=localhost'
   ```

2. **Convert to Secure UserService (HTTPS):**
   Upgrade the UserService to use HTTPS by creating an HTTPS server in Node.js.
   ```javascript
   const https = require('https');
   const fs = require('fs');

   const credentials = {
     key: fs.readFileSync('key.pem'),
     cert: fs.readFileSync('cert.pem')
   };

   const userService = express();

   // ... existing user service setup ...

   const httpsServer = https.createServer(credentials, userService);

   httpsServer.listen(3010, () => {
     console.log('User Service with HTTPS started on port 3010');
   });
   ```

**Steps to run the demo**

Note: Change the port number of the url `https://localhost:3010/` as per your service port. Open terminal from the `m05_demo03_after` directory.

1. Start the UserService by running `node UserService.js` in your terminal.

2. Register user
```
curl -k -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"password123","settings":{"gender":"male", "address": "11 petunia drive, apt 8h, new brunwick, nj, 08901" }}' https://localhost:3010/addUser
```
You will see the output similar to:
```
User added successfully 
```

1. Test the secure endpoints using `curl` with the `--insecure` flag (since self-signed certificates are not trusted by default):

```
curl -k -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"password123"}' https://localhost:3010/login 
```

You will see output similar to:
```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0dXNlciIsImlhdCI6MTY5OTA1MTg3MCwiZXhwIjoxNjk5MDU1NDcwfQ.3GEVDX5A-tUIT9Xy5H_coSTd6O7YIrzMb5sCjJDf2D0"}
```

4. Use the token received from the login endpoint to make a secure request to the protected route:

```
curl -k -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0dXNlciIsImlhdCI6MTY5OTA1MTg3MCwiZXhwIjoxNjk5MDU1NDcwfQ.3GEVDX5A-tUIT9Xy5H_coSTd6O7YIrzMb5sCjJDf2D0" https://localhost:3010/userSettings
```

You should see output similar to:

```json
{"gender":"male","address":"11 petunia drive, apt 8h, new brunwick, nj, 08901"}   
```
## Summary

In this demo, the focus is on Data Encryption and Secure Communication within the BookStoreHub. Given that JWT authentication was implemented earlier, this demo builds upon that foundation by ensuring that the transmission of these tokens (and any other data) is secured through encryption. Here's a summary of the lesson:

**Initial Issue:**
- Even with JWT in place, the transmission of data over HTTP is not secure, leaving sensitive information vulnerable to interception.
- Data integrity and privacy weren't assured because the service communication wasn't encrypted.

**Achievements:**
In the demo, securing communication within the BookStoreHub project refers to the implementation of HTTPS to protect the data in transit between the client and the server. Here's how this was achieved and what it entails:

1. **SSL/TLS Certificates:**
   - By generating and using SSL/TLS certificates, the data transmitted between the client and the server is encrypted. This means that even if the data packets are intercepted, they cannot be deciphered without the encryption keys.

2. **HTTPS Server Configuration:**
   - The Node.js server was configured to use these certificates, effectively creating an HTTPS server. HTTPS is the secure version of HTTP, where 'S' stands for 'Secure'. It uses TLS (Transport Layer Security) protocol to provide encrypted communication and secure identification of a network web server.

3. **Secure JWT Transmission:**
   - JWTs, which were previously implemented for authentication, are now transmitted securely over HTTPS. This means the tokens, which could include sensitive user information, are protected from being intercepted in plain text by malicious actors.

4. **Middleware for Secure Endpoints:**
   - The use of middleware in Express.js ensures that all the requests, including those carrying JWTs for authentication, are handled over HTTPS, thus maintaining the confidentiality and integrity of the authentication process.

5. **Enforcing Secure Communication:**
   - By setting up HTTPS, you're enforcing that all communications must use TLS, which includes both the data and the headers (which would contain JWTs). This ensures that all aspects of the communication are encrypted.

This secured communication setup is essential not only for protecting user credentials and personal information but also for securing service-to-service communication within the BookStoreHub. For instance, if the BookService and the OrderService communicate with each other to process orders, setting up HTTPS ensures that this internal traffic is also encrypted, protecting against potential threats within the network.

By implementing these security measures, students learn how to practically apply encryption to protect data within a microservices architecture, ensuring secure operations within the BookStoreHub ecosystem.

**Lessons Learned:**
- The importance of encrypting data to prevent unauthorized access and ensure data integrity.
- How to configure an Express.js application to serve traffic over HTTPS using SSL/TLS certificates.
- The role of secure communication protocols like HTTPS in protecting against common web vulnerabilities.
- Students gained a deeper understanding of network security and why encryption is a non-negotiable aspect of modern web development.

By the end of this demo, students would have acquired the skills to secure a web service's communication channels, ensuring that sensitive data is not compromised, which is crucial for maintaining user trust and complying with data protection regulations.