const express = require('express');
const userService = express();
const shardManager = require('./shardManager');

userService.post('/user', (req, res) => {
  const shard = shardManager.getShardForUser(req.body.userId);
  shard.saveUser(req.body);
  res.status(201).send();
});

userService.listen(3004, () => {
  console.log('User Service with Sharding started on port 3004');
});
