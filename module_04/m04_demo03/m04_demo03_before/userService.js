const express = require('express');
const userService = express();
const db = require('./db');

userService.post('/user', (req, res) => {
  db.saveUser(req.body);
  res.status(201).send();
});

userService.listen(3004, () => {
  console.log('User Service started on port 3004');
});
