const express = require('express');
const serviceRegistry = express();
const services = {};

serviceRegistry.post('/register', (req, res) => {
  const { serviceName, serviceUrl } = req.body;
  services[serviceName] = serviceUrl;
  res.status(201).send();
});

serviceRegistry.get('/discover/:serviceName', (req, res) => {
  res.send(services[req.params.serviceName]);
});

serviceRegistry.listen(3000, () => {
  console.log('Service Registry started on port 3000');
});
