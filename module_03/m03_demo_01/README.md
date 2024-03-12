# Module 3 - Demo 01
Installing and running Redis on macOS can be done in several ways, including using Homebrew (a package manager for macOS), downloading and compiling from source, or running it as a Docker container. The simplest method for most users is via Homebrew.

### Installing Redis with Homebrew:

1. **Install Homebrew**:
   If you don't already have Homebrew installed on your Mac, open the Terminal app and run the following command. This script installs Homebrew itself.

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   Follow the on-screen instructions to complete the installation.

2. **Install Redis**:
   Once Homebrew is installed, you can easily install Redis by running the following command in the Terminal:

   ```bash
   brew install redis
   ```
  ![image](https://gist.github.com/assets/330383/66dbdfe3-fed5-43e1-a9d0-cb19e63f3910)
  
3. **Start Redis**:
   After installing Redis, you can start it using Homebrew's services start command:

   ```bash
   brew services start redis
   ```
   This command will start Redis as a background service, which means Redis will automatically start every time you boot your computer unless you stop the service manually.

  ![image](https://gist.github.com/assets/330383/ee4ec024-0185-4f2b-bf3c-0fd99d1b2eb5)

  

4. **Verify Redis is Running**:
   You can check that Redis is running correctly by using the `redis-cli` tool, which is a command-line interface to interact with Redis. Run the `ping` command, and you should receive a `PONG` response if Redis is running:

   ```bash
   redis-cli ping
   ```
  ![image](https://gist.github.com/assets/330383/aa806509-b474-4ec1-8555-72d16d140cec)

  ![image](https://gist.github.com/assets/330383/68837071-9d32-42da-989c-c1b109cde207)

### Stopping Redis (if needed):

- To stop the Redis service you started with Homebrew, run:

  ```bash
  brew services stop redis
  ```

### Uninstalling Redis (if needed):

- If you ever need to uninstall Redis, you can use Homebrew to remove it:

  ```bash
  brew uninstall redis
  brew cleanup
  ```

- To remove the Redis service from starting automatically, you can run:

  ```bash
  brew services stop redis
  ```

This process installs Redis on your macOS and sets it up to run as a background service, making it easy to start working on applications that require Redis without having to manually start and stop the Redis server.

## Step 2: 


### Directory Structure (for reference):
```
bookstorehub/
|-- read-service/
    |-- src/
        |-- config/
            `-- redisConfig.js
        |-- controllers/
            `-- bookController.js
        |-- services/
            `-- bookService.js
        `-- index.js
    |-- package.json
`-- .env
```
 
### Testing and Verification
- **Testing Endpoint**: Use a tool like Postman or a simple `curl` command to test the `/book-of-the-month` endpoint. Expect to receive details of the "Book of the Month."
  
  ```bash
  curl http://localhost:3007/book-of-the-month
  ```
  Output should be similar to: `{"title":"Example Book","author":"Author Name"}`

- **Load Testing**: To simulate a 70% increase in traffic and verify the 2-second load time, you can use a load testing tool like [Apache JMeter](https://jmeter.apache.org/) or [Artillery.io](https://www.artillery.io/). Configure the tool to simulate the desired number of requests per second and observe the response times.

This setup demonstrates how to use Redis with a Node.js application for efficient read operations. The key takeaway is the implementation of CQRS for optimizing read operations, significantly improving response times under high load.