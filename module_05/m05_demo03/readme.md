
## Module 05: Demo 03: Data Encryption and Secure Communication
> Demo: You will implement data encryption strategies for sensitive data within the BookStoreHub, ensuring data privacy and integrity


Note: Change the port number of the url `https://localhost:3010/` as per your service port.

1. Start the UserService by running `node UserService.js` in your terminal.

2. Register user
```
curl -k -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"password123","settings":{"gender":"male", "address": "11 petunia drive, apt 8h, new brunwick, nj, 08901" }}' https://localhost:3010/addUser
```
You will see the output similar to:
```
User added successfully 
```

3. Test the secure endpoints using `curl` with the `--insecure` flag (since self-signed certificates are not trusted by default):

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

In this demo, the focus is on Data Encryption and Secure Communication within the BookStoreHub. Given that JWT authentication was implemented earlier, this demo builds upon that foundation by ensuring that the transmission of these tokens (and any other data) is secured through encryption. Here's a summary of the lesson:

**Initial Issue:**
- Even with JWT in place, the transmission of data over HTTP is not secure, leaving sensitive information vulnerable to interception.
- Data integrity and privacy weren't assured because the service communication wasn't encrypted.

**Achievements:**
- **Implementation of HTTPS:** The UserService was upgraded to use HTTPS, ensuring that all data transmitted between the client and the server is encrypted. This applies to JWTs, user credentials, settings, and any data exchanged.
- **Introduction to SSL/TLS:** Students learned about SSL/TLS certificates and how they are used to set up an HTTPS server in Node.js.
- **Data Encryption in Practice:** By implementing HTTPS, students saw how data encryption is applied in real-world scenarios, reinforcing the concept that security is not just about authentication but also about maintaining the confidentiality and integrity of data in transit.

**Lessons Learned:**
- The importance of encrypting data to prevent unauthorized access and ensure data integrity.
- How to configure an Express.js application to serve traffic over HTTPS using SSL/TLS certificates.
- The role of secure communication protocols like HTTPS in protecting against common web vulnerabilities.
- Students gained a deeper understanding of network security and why encryption is a non-negotiable aspect of modern web development.

By the end of this demo, students would have acquired the skills to secure a web service's communication channels, ensuring that sensitive data is not compromised, which is crucial for maintaining user trust and complying with data protection regulations.