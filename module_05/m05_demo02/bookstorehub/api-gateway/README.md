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
curl http://localhost:3020/api/books

# expected output
[{"id":1,"title":"Node.js Microservices","author":"Jane Doe"},{"id":2,"title":"Advanced Node.js","author":"John Smith"}]

# 2. Rate limiting demo:
# Make 5 successful requests
for i in {1..4}; do 
  curl http://localhost:3020/api/books; 
  echo "";  # Add a newline for better readability
done

# Wait a moment (1min) here to simulate a pause in traffic

# Then make additional requests to trigger rate limiting
for i in {1..6}; do 
  curl http://localhost:3020/api/books; 
  echo ""; 
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